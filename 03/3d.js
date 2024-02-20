let fs =require('fs')
let arvg= process.argv;
let data = arvg[3]
function delet (){

}
function unlinkcallback(err){
    if(err){
        if(err.code==='EPERM'){
            fs.rmdir(process.argv[2],delet)

        }
        else{
            console.log("eror : ",err)
        }
        
    }
    else{
        console.log("deleted ")
    }

    
}
fs.unlink(process.argv[2],unlinkcallback)