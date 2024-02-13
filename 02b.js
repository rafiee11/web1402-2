let input =process.argv;

let names;
let age;

for(i=0;i<input.Lenght;i++){
    names = input[i+2];
    age =input[i+3];
    console.log(names + age);
}
