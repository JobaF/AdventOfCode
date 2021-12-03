import input from './input.json'

let counter = 0;
let lastDepth;

input.map((depth, index) => {
    if(index >= 2  || index <= input.length-2){
        if(Number(depth) > Number(lastDepth)){
            counter++;
        }
    }
    lastDepth = depth;
})

console.log(counter);