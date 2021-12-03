import input from './input.json'

let counter = 0;
let lastWindowDepth, windowDepth;

input.map((depth, index) => {
    if(index >= 2){
        windowDepth = Number(depth) + Number(input[index-1]) + Number(input[index-2]);
        
        if(windowDepth > lastWindowDepth){
            counter++;
        }
    }
    lastWindowDepth = windowDepth;
})

console.log(counter);