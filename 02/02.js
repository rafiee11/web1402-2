console.log(process.argv);

let input=[];

function x(val,index){
    if(index>1){
        input[index - 2]=val;
    }
}

process.argv.forEach(x);

console.log(input)
