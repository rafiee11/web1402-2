//node .\03-f.js create x.txt salamSALAMsalam
//node .\03-f.js append x.txt salamSALAMsalam
//node .\03-f.js delete x.txt
//node .\03-f.js delete myDirName
//node .\03-f.js copy x.txt y.txt

//node .\04-a.js read x.txt
//noed .\04-a.js createRecord nasser torabzade nasser@x.com



//noed .\05-a.js readRecord 102
//noed .\05-a.js deleteRecord 102


let fs = require('fs');
let command = process.argv[2];
let name = process.argv[3];
let arg4 = process.argv[4];
let message;


function unlinkCallback(err) {
    if(err){
        if(err.code === 'EPERM'){
            fs.rmdir(name, rmdirCallback); 
        }
        else{
            console.log('ERR: ', err)
        }
    }
    else{
        console.log("unlink  successfull.")
    }
}

function rmdirCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('rmdir successfull')
    }
}

function fsCallback(err){
    let messages ={
        copy: 'copyFile successfull',
        append: 'append successfull.',
        create: 'writeFile successfull.',
        read:  'readFile successfull.',
        createRecord:  'createRecord done successfully.'
    };

    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(messages[command]);
    }
}

function readFileCallback(err, data){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(messages[command]);
        console.log('Data: ', data)
    }
}

function createRecordController(){
    let data = {
        name: process.argv[3],
        family: process.argv[4],
        email: process.argv[5]
    }

    fs.readFile('database.json', {encoding: 'utf8'}, function(err, fileData){
        if(err){
            console.log('ERR: ', err);
        }
        else {
            fileData = JSON.parse(fileData);
            data.id = 100 + fileData.records.length;
            fileData.records.push(data);
            fileData = JSON.stringify(fileData);
            fs.writeFile('database.json', fileData, fsCallback);
        }
    });
}

function readRecordController(){      
    function getArrayIndex(array, id){
        for(let i=0; i<array.length; i++){
            if(array[i].id == id ){
                return i;
            }
        }
    }
    
    fs.readFile('database.json', {encoding: 'utf8'}, function(err, fileData){
        if(err){
            console.log('ERR: ', err);
        }
        else { 
            fileData = JSON.parse(fileData);

            if(fileData.records[getArrayIndex(fileData.records, name)] === undefined){
                console.log("Record not found.")
            }
            else{
                console.log('record: ', fileData.records[getArrayIndex(fileData.records, name)]);   
            }                             
        }
    });
}

function deleteRecordController(){
    function getArrayIndex(array, id){
        for(let i=0; i<array.length; i++){
            if(array[i].id == id ){
                return i;
            }
        }
    }
    
    fs.readFile('database.json', {encoding: 'utf8'}, function(err, fileData){
        if(err){
            console.log('ERR: ', err);
        }
        else { 
            fileData = JSON.parse(fileData);
            // let deleteIndex = getArrayIndex(fileData.records, name);
            // fileData.records.splice(deleteIndex, 1);     

            console.log('getArrayIndex', getArrayIndex(fileData.records, name))
            let x = fileData.records.splice(getArrayIndex(fileData.records, name), 1); 
            console.log('fileData.records.splice', fileData.records);
            console.log('deleted items', x)
            
            fileData = JSON.stringify(fileData);
            fs.writeFile('database.json', fileData, fsCallback);
        }
    });
}
async function readredis(){
    let redis = require('redis')


  const client = await redis.createClient({
    url: 'redis://127.0.0.1:6379'
  })
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
      await client.set(name,arg4);
      message="ok";
      const value = await client.get('key');
  await client.disconnect();


}
async function delredis(){
    let redis = require('redis')


  const client = await redis.createClient({
    url: 'redis://127.0.0.1:6379'
  })
  .on('error', err => console.log('Redis Client Error', err))
  .connect();
      await client.del(name);
      const value = await client.get('key');
  await client.disconnect();


}


let commands = {
    create: function(){
        fs.writeFile(name, arg4, fsCallback);
    },
    append: function(){
        fs.appendFile(name, arg4, fsCallback); 
    },
    delete: function(){
        fs.unlink(name, unlinkCallback);
    },
    copy: function(){
        fs.copyFile(name, arg4, fsCallback);
    },
    read: function(){
        fs.readFile(name, {encoding: 'utf8'}, readFileCallback);
    },
    createRecord: createRecordController,
    readRecord: readRecordController,
    deleteRecord: deleteRecordController,
    readredis:readredis,
    delredis:delredis,
}   

//node .\04-a.js readRecord 2

// commands[command]();

// let x = ['AAAA', 'BBBB'];

// x.push(1);
// x.push(2);
// x.push("kjhkljhkj;lh");
// x.push({x:1, y:3});
// x.push(['A', 'B', 'C']);

// console.log(x);

let server = http.createServer(function(request, response){

    console.log('request.method', request.method);
    console.log('request.url', request.url);

    command = request.url.split('/')[1];
    name = request.url.split('/')[2];
    arg4 = request.url.split('/')[3];
    
    commands[command]();



    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.write(message);

    response.end();

});


server.listen(port);
console.log("Server is running on port:" + port)

