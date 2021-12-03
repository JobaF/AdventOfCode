import input from './input.json';

let sumOfPositions = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
let lengthInput = input.length;
let gammaRate = '';
let epsilonRate = '';

input.map((value) => {
    for(let i = 0; i<value.length; i++){
        sumOfPositions[i]+= Number(value.charAt(i));
    }
})

for(let j = 0; j < sumOfPositions.length; j++){
    if(sumOfPositions[j] > (lengthInput/2)){
        gammaRate += '1';
        epsilonRate += '0';
    }
    else{
        gammaRate += '0';
        epsilonRate += '1';
    }
    
}

const binaryToDecimal = (binary) => {
    let decimal = 0;
    for(let i = 0; i < binary.length; i++){
        decimal += Number(binary.charAt(i)) * 2**(binary.length-i-1);
    }

    return decimal;
}

console.log(binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate))
