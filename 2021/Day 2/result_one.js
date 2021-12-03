import input from './input.json'

let horizontal = 0, depth = 0;

input.map((value) => {
    if(value.includes('forward')) horizontal += Number(value.substr(value.length-1));
    if(value.includes('up')) depth -= Number(value.substr(value.length-1));
    if(value.includes('down')) depth += Number(value.substr(value.length-1));
})

console.log(horizontal*depth)
