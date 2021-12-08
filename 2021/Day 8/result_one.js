import input from './input.json'

let outputDigits = []
let segmentsCount = [0,0,0,0,0,0,0,0]
let digitOccurencesOneFourSevenEight = 0;

function fillOutputDigitsArray() {
    for(let i in input){
        outputDigits.push(input[i].split('|')[1].substring(1).split(' '))
    }
}

function countSegmentOccurences() {
    for(let i in outputDigits){
        for(let j=0; j<4; j++){
            segmentsCount[outputDigits[i][j].length]++;
        }
    }
}

function sumUpDigitOccurencesOneFourSevenEight() {
    digitOccurencesOneFourSevenEight = segmentsCount[2] + segmentsCount[3] + segmentsCount[4] + segmentsCount[7]
} 

function outputSolution() {
    console.log(digitOccurencesOneFourSevenEight)
}

fillOutputDigitsArray();
countSegmentOccurences();
sumUpDigitOccurencesOneFourSevenEight()
outputSolution();