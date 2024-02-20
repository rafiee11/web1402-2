let fs =require('fs')
let arvg= process.argv;
let data = arvg[3]
for (i=4;i=arvg.length;i++){
    data=data+" "+arvg[i]
}
// fs.appendFile(arvg[2],data,function(err){
//     if(err) throw err
//     console.log("its done")
// })
console.log(data)
