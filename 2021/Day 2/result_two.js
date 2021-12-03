import input from './input.json'

let horizontal = 0, depth = 0, aim = 0;

input.map((value) => {
    let numberValue = Number(value.substr(value.length-1)); 
    if(value.includes('forward')){
        horizontal += numberValue;
        depth += aim * numberValue;
    } 
    if(value.includes('up')) aim -= numberValue;
    if(value.includes('down')) aim += numberValue;
})

console.log(horizontal*depth)
