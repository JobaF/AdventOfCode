import input from './input.json'

let oxygenRating = input;
let co2Rating = input;

const binaryToDecimal = (binary) => {
    let decimal = 0;
    for(let i = 0; i < binary.length; i++){
        decimal += Number(binary.charAt(i)) * 2**(binary.length-i-1);
    }

    return decimal;
}

for(let i = 0; i<12; i++){
    if(oxygenRating.length > 1){
        let sumOfIndex = oxygenRating.reduce(function (accumulator, currentValue) {
            return (accumulator + Number(currentValue.charAt(i)));
            }, 0);
        if(sumOfIndex >= (oxygenRating.length / 2)){
            let newArray = []
            oxygenRating.map(value => {
                if(value.charAt(i) == '1'){
                    newArray.push(value)
                }
            });
            oxygenRating = newArray;
        }
        else if(sumOfIndex < (oxygenRating.length / 2)){
            let newArray = []
            oxygenRating.map(value => {
                if(value.charAt(i) == '0'){
                    newArray.push(value)
                }
            });
            oxygenRating = newArray;
        }
    }
    if(co2Rating.length > 1){
        let sumOfIndex = co2Rating.reduce(function (accumulator, currentValue) {
            return (accumulator + Number(currentValue.charAt(i)));
            }, 0);
        if(sumOfIndex >= (co2Rating.length / 2)){
            let newArray = []
            co2Rating.map(value => {
                if(value.charAt(i) == '0'){
                    newArray.push(value)
                }
            });
            co2Rating = newArray;
        }
        else if(sumOfIndex < (co2Rating.length / 2)){
            let newArray = []
            co2Rating.map(value => {
                if(value.charAt(i) == '1'){
                    newArray.push(value)
                }
            });
            co2Rating = newArray;
        }
    }
}

console.log(binaryToDecimal(oxygenRating[0]) * binaryToDecimal(co2Rating[0]));