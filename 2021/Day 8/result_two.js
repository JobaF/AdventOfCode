import input from './input.json'

// Die 1 hat immer 2 Zeichen
// Die 7 hat immer 3 Zeichen
// Die 4 hat immer 4 Zeichen
// Die 8 hat immer 7 Zeichen

// Die 2, 3, 5 hat immer 5 Zeichen
// Die 0, 6, 9 hat immer 6 Zeichen

// 1 hat die gleichen einsen wie 3
// 7 hat die gleichen einsen wie 3

// Unterschiede 4 und 2,3,5 -> 4 und 3 haben 3 gleiche Inputs
//                          -> 4 und 2 haben 2 gleiche Inputs
//                          -> 4 und 5 haben 3 gleiche Inputs

// 2 und 3 haben einen Unterschied
// 2 und 5 haben zwei Unterschiede

let outputDigits = []
let inputSignals = []
let dynamicDecryptArray = ['', '', '', '', '', '', '', '', '', '']
let fiveLength = []
let sixLength = []
let result = 0

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

function fillFiveLengthAndSixLengthArray() {
  for (let i in inputSignals) {
    const fiveArray = []
    const sixArray = []
    for (let j in inputSignals[i]) {
      if (hasLengthX(inputSignals[i][j], 5)) {
        fiveArray.push(inputSignals[i][j])
      }
      if (hasLengthX(inputSignals[i][j], 6)) {
        sixArray.push(inputSignals[i][j])
      }
    }
    fiveLength.push(fiveArray)
    sixLength.push(sixArray)
  }
}

function decryptOneFourSevenEight(inputArray) {
  for (let i in inputArray) {
    const value = stringToOccurenceArray(inputArray[i])
    const sum = stringToOccurenceArray(inputArray[i]).reduce(
      (pv, cv) => pv + cv,
      0,
    )
    if (sum == 2) {
      dynamicDecryptArray[1] = inputArray[i]
    }
    if (sum == 4) {
      dynamicDecryptArray[4] = inputArray[i]
    }
    if (sum == 3) {
      dynamicDecryptArray[7] = inputArray[i]
    }
    if (sum == 7) {
      dynamicDecryptArray[8] = inputArray[i]
    }
  }
}

function decryptThree(inputArray, value) {
  for (let i in inputArray) {
    const currentValue = inputArray[i]
    const occurencesOfOne = stringToOccurenceArray(dynamicDecryptArray[1])
    const occurencesOfSeven = stringToOccurenceArray(dynamicDecryptArray[7])
    const occurencesCurrentValue = stringToOccurenceArray(currentValue)
    if (hasLengthX(currentValue, 5)) {
      const accordanceToOne = occurencesCurrentValue.reduce(function (r, a, i) {
        return r + a * occurencesOfOne[i]
      }, 0)
      const accordanceToSeven = occurencesCurrentValue.reduce(function (
        r,
        a,
        i,
      ) {
        return r + a * occurencesOfSeven[i]
      },
      0)
      if (accordanceToOne == 2 && accordanceToSeven == 3) {
        dynamicDecryptArray[3] = currentValue
        for (let k = 0; k < fiveLength[value].length; k++) {
          if (fiveLength[value][k] == currentValue) {
            fiveLength[value].splice(k, 1)
          }
        }
      }
    }
  }
}

function decryptTwoAndFive(fiveLengthArray) {
  for (let i in fiveLengthArray) {
    const currentValue = fiveLengthArray[i]
    const occurencesOfFour = stringToOccurenceArray(dynamicDecryptArray[4])
    const occurencesCurrentValue = stringToOccurenceArray(currentValue)
    if (hasLengthX(currentValue, 5)) {
      const accordanceToFour = occurencesCurrentValue.reduce(function (
        r,
        a,
        i,
      ) {
        return r + a * occurencesOfFour[i]
      },
      0)
      if (accordanceToFour == 3) {
        dynamicDecryptArray[5] = currentValue
      }
      if (accordanceToFour == 2) {
        dynamicDecryptArray[2] = currentValue
      }
    }
  }
}

function decryptNine(inputArray, value) {
  for (let i in inputArray) {
    const currentValue = inputArray[i]
    const occurencesOfThree = stringToOccurenceArray(dynamicDecryptArray[3])
    const occurencesCurrentValue = stringToOccurenceArray(currentValue)
    if (hasLengthX(currentValue, 6)) {
      const accordanceToThree = occurencesCurrentValue.reduce(function (
        r,
        a,
        i,
      ) {
        return r + a * occurencesOfThree[i]
      },
      0)
      if (accordanceToThree == 5) {
        dynamicDecryptArray[9] = currentValue
        for (let k = 0; k < sixLength[value].length; k++) {
          if (sixLength[value][k] == currentValue) {
            sixLength[value].splice(k, 1)
          }
        }
      }
    }
  }
}

function decryptZeroAndSix(sixLengthArray) {
  for (let i in sixLengthArray) {
    const currentValue = sixLengthArray[i]
    const occurencesOfFive = stringToOccurenceArray(dynamicDecryptArray[5])
    const occurencesCurrentValue = stringToOccurenceArray(currentValue)
    if (hasLengthX(currentValue, 6)) {
      const accordanceToFive = occurencesCurrentValue.reduce(function (
        r,
        a,
        i,
      ) {
        return r + a * occurencesOfFive[i]
      },
      0)
      if (accordanceToFive == 5) {
        dynamicDecryptArray[6] = currentValue
      }
      if (accordanceToFive == 4) {
        dynamicDecryptArray[0] = currentValue
      }
    }
  }
}

function hasLengthX(element, x) {
  if (element.length == x) {
    return true
  } else return false
}

function convertOutputToDigits(output) {
  let returnValue = ''
  for (let i in output) {
    for (let j in dynamicDecryptArray) {
      if (output[i] == dynamicDecryptArray[j]) {
        returnValue += j
      }
    }
  }
  return returnValue
}

function loopThroughAllArray() {
  for (let i in inputSignals) {
    decryptOneFourSevenEight(inputSignals[i])
    decryptThree(inputSignals[i], i)
    decryptNine(inputSignals[i], i)
    decryptTwoAndFive(fiveLength[i])
    decryptZeroAndSix(sixLength[i])
    const numberResult = convertOutputToDigits(outputDigits[i])
    result += Number(numberResult)
    dynamicDecryptArray = ['', '', '', '', '', '', '', '', '', '']
  }
}

fillOutputDigitsArray()
sortAllArrayElementsAlphabetically(inputSignals)
sortAllArrayElementsAlphabetically(outputDigits)
fillFiveLengthAndSixLengthArray()
loopThroughAllArray()
console.log(result)