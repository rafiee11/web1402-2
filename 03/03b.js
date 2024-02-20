
let fs = require('fs');
function appendfile(err){
    if(err){
        console.log("err",err)
    }
    else {
        console.log("OK append");
    }
}


fs.appendFile(process.argv[3],process.argv[4],appendfile);


