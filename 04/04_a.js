//node .\03-f.js create x.txt salamSALAMsalam
//node .\03-f.js append x.txt salamSALAMsalam
//node .\03-f.js delete x.txt
//node .\03-f.js delete myDirName
//node .\03-f.js copy x.txt y.txt  
//nodr read.

let fs = require('fs');
const { json } = require('stream/consumers');
let command = process.argv[2];
let name = process.argv[3];
let arg4 = process.argv[4];

function writeFileCallback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('writeFile  successfull.');
    }
}

function appendFileCallback(err) {
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('append  successfull.');
    }
}

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

function copyFileCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log('copyFile successfill')
    }
}

function readcallback(err,Date){
    if (err){
        console.log("err:")
    }
    else
    console.log(Date);
}


let messages ={
    copy: 'copyFile successfull',
    append: 'append  successfull.',
    create: 'writeFile  successfull.',
    read:   'read',
    creatfile: 'jej'

}

function fsCallback(err){
    if(err){
        console.log('ERR: ', err);
    }
    else{
        console.log(messages[command])
    }
}


function datacallback(Date){
    console.log(Date);
}

// switch(command){
//     case 'create':
//         fs.writeFile(name, arg4, writeFileCallback); 
//         break;
//     case 'append':
//         fs.appendFile(name, arg4, appendFileCallback); 
//         break;
//     case 'delete':
//         fs.unlink(name, unlinkCallback);
//         break;
//     case 'copy':
//         fs.copyFile(name, arg4, copyFileCallback); 
//         break;
//     default:
//         console.log('Command not found');
// }



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
        fs.readFile(name,readcallback,datacallback);
    },
    creatfile: function(){
        let data={
           name:process.argv[3],
           family:process.argv[4],
           age:process.argv[5]
        }

      fs.readFile('database.json',{encoding:'utf8'},function(err,filedata){
    if(err){
        console.log(err);
    }
    else{
        filedata.record.push(data);
        filedata=json.toString(filedata);
        fs.writeFile('database.json',filedata,fsCallback)
    }
    });


    }
}
    



// commands[command]();


if(process.argv[2]=="creatfile"){
    let data={
        name:process.argv[3],
        family:process.argv[4],
        age:process.argv[5]
     }

   fs.readFile('database.json',{encoding:'utf8'},function(err,filedata){
 if(err){
     console.log(err);
 }
 else{
    filedata=JSON.parse(filedata);
     filedata.record.push(data);
     filedata=JSON.stringify(filedata);
     fs.writeFile('database.json',filedata,fsCallback)
 }
 });
}




if(process.argv[2]=="recordfile"){
    fs.readFile('database.json','utf8',function readcallback(err,filedata){
        if(err){
            console.log(err);
        }
        else {
            filedata=json.parse(filedata);
            console.log(filedata.record[process.argv[3]]);
        }
    }
}