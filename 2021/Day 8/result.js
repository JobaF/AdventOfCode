import input from './testInput.json'

let outputDigits = []
let inputSignals = []

function fillOutputDigitsArray() {
  for (let i in input) {
    inputSignals.push(
      input[i]
        .split('|')[0]
        .substring(0, input[i].split('|')[0].length - 1)
        .split(' '),
    )
    outputDigits.push(input[i].split('|')[1].substring(1).split(' '))
  }
}

function sortAllArrayElementsAlphabetically(array) {
  for (let i in array) {
    for (let j in array[i]) {
      array[i][j] = array[i][j].split('').sort().join('')
    }
  }
}

function letterToAlphabetDigit(letter) {
  return letter.charCodeAt(0) - 97
}

function stringToOccurenceArray(string) {
  const letterOccurences = [0, 0, 0, 0, 0, 0, 0]
  for (let l = 0; l < string.length; l++) {
    const currentChar = string.substring(l, l + 1)
    letterOccurences[letterToAlphabetDigit(currentChar)]++
  }

  return letterOccurences
}

fillOutputDigitsArray()
sortAllArrayElementsAlphabetically(inputSignals)
sortAllArrayElementsAlphabetically(outputDigits)
console.log(inputSignals)
