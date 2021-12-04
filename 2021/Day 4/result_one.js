import input from './input.json'

const drawingNumbers = [
  '42',
  '32',
  '13',
  '22',
  '91',
  '2',
  '88',
  '85',
  '53',
  '87',
  '37',
  '33',
  '76',
  '98',
  '89',
  '19',
  '69',
  '9',
  '62',
  '21',
  '38',
  '49',
  '54',
  '81',
  '0',
  '26',
  '79',
  '36',
  '57',
  '18',
  '4',
  '40',
  '31',
  '80',
  '24',
  '64',
  '77',
  '97',
  '70',
  '6',
  '73',
  '23',
  '20',
  '47',
  '45',
  '51',
  '74',
  '25',
  '95',
  '96',
  '58',
  '92',
  '94',
  '11',
  '39',
  '63',
  '65',
  '99',
  '48',
  '83',
  '29',
  '34',
  '44',
  '75',
  '55',
  '17',
  '14',
  '56',
  '8',
  '82',
  '59',
  '52',
  '46',
  '90',
  '5',
  '41',
  '60',
  '67',
  '16',
  '1',
  '15',
  '61',
  '71',
  '66',
  '72',
  '30',
  '28',
  '3',
  '43',
  '27',
  '78',
  '10',
  '86',
  '7',
  '50',
  '35',
  '84',
  '12',
  '93',
  '68',
]
let winningNumber
let winningBoard
let numberBoards = new Array()
let markingBoards = new Array()
let sumOfUnmarkedNumbersOnWinningBoard = 0

const checkIfWinHorizontal = (input) => {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < 5; j++) {
      if (
        input[i][j][0] == 1 &&
        input[i][j][1] == 1 &&
        input[i][j][2] == 1 &&
        input[i][j][3] == 1 &&
        input[i][j][4] == 1
      ) {
        return i
      }
    }
  }
  return false
}

const checkIfWinVertical = (input) => {
  for (let i = 0; i < input.length; i += 5) {
    for (let j = 0; j < 5; j++) {
      if (
        input[i][0][j] == 1&&
        input[i][1][j] == 1&&
        input[i][2][j] == 1&&
        input[i][3][j] == 1&&
        input[i][4][j] == 1
      ) {
        return i
      }
    }
  }
  return false
}

// vertical --- 00 10 20 30 40
//              01 11 21 31 41
//              02 12 22 32 42

// horizontal - 00 01 02 03 04
//              10 11 12 13 14
//              20 21 22 23 24
for (let i = 0; i < input.length; i += 5) {
    let convertedNumberBoard = [input[i].split(',').map(Number),input[i+1].split(',').map(Number),input[i+2].split(',').map(Number),input[i+3].split(',').map(Number),input[i+4].split(',').map(Number)]
    let markingBoard = [[Number(0), Number(0), Number(0), Number(0), Number(0)],[Number(0), Number(0), Number(0), Number(0), Number(0)],[Number(0), Number(0), Number(0), Number(0), Number(0)],[Number(0), Number(0), Number(0), Number(0), Number(0)],[Number(0), Number(0), Number(0), Number(0), Number(0)]]
    markingBoards.push(markingBoard)
    numberBoards.push(convertedNumberBoard)
}

for (let a = 0; a < drawingNumbers.length; a++) {
  for (let i = 0; i < numberBoards.length; i++) {
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 5; k++) {
        if (parseInt(drawingNumbers[a]) == numberBoards[i][j][k]) {
          markingBoards[i][j][k] = 1
        }
      }
    }
  }
  if (checkIfWinHorizontal(markingBoards) != 0) {
    winningNumber = parseInt(drawingNumbers[a])
    winningBoard = checkIfWinHorizontal(markingBoards)
    break
  }
  if (checkIfWinVertical(markingBoards) != 0) {
    winningNumber = parseInt(drawingNumbers[a])
    winningBoard = checkIfWinVertical(markingBoards)
    break
  }
}

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (markingBoards[winningBoard][i][j] == 0) {
      sumOfUnmarkedNumbersOnWinningBoard += numberBoards[winningBoard][i][j]
    }
  }
}

console.log(winningNumber)
console.log(sumOfUnmarkedNumbersOnWinningBoard)
console.log(sumOfUnmarkedNumbersOnWinningBoard*winningNumber)