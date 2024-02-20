let fs = require('fs');



function copy(err){
    if(err){
        console.log("not copy.");
    }
    else{
        console.log("copy");
    }
}

fs.copyFile(process.argv[2],process.argv[3],copy);