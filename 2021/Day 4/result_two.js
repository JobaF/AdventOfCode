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

let markingBoards = []
let numberBoards = []

for (let i = 0; i < input.length; i += 5) {
  let convertedNumberBoard = [
    input[i].split(',').map(Number),
    input[i + 1].split(',').map(Number),
    input[i + 2].split(',').map(Number),
    input[i + 3].split(',').map(Number),
    input[i + 4].split(',').map(Number),
  ]
  let markingBoard = [
    [Number(0), Number(0), Number(0), Number(0), Number(0)],
    [Number(0), Number(0), Number(0), Number(0), Number(0)],
    [Number(0), Number(0), Number(0), Number(0), Number(0)],
    [Number(0), Number(0), Number(0), Number(0), Number(0)],
    [Number(0), Number(0), Number(0), Number(0), Number(0)],
  ]
  markingBoards.push(markingBoard)
  numberBoards.push(convertedNumberBoard)
}
// 1. Schritt: Nummer ziehen
// 2. Schritt: Nummern markieren
// 3. Schritt: Checken, ob Reihe oder Spalte komplett markiert ist
// 4. Schritt: Falls Sieger, entferne Board aus Pool
// 5. Schritt: Gehe zu 1. so lange, wie es noch mehr als ein Board gibt oder bis Nummern durch

function Board(fiveByFiveArray) {
  this.board = []
  this.board = fiveByFiveArray
  this.bingo = false

  this.markNumber = function (drawingNumber) {
    if (this.bingo == false) {
      if (this.board.some((row) => row.includes(Number(drawingNumber)))) {
        for (let i = 0; i < 5; i++) {
          for (let j = 0; j < 5; j++) {
            if (this.board[i][j] == Number(drawingNumber)) {
              this.board[i][j] = 999
            }
          }
        }
      }
    }
  }

  this.checkRowForBingo = function () {
    for (let i = 0; i < 5; i++) {
      if (
        this.board[i][0] == 999 &&
        this.board[i][1] == 999 &&
        this.board[i][2] == 999 &&
        this.board[i][3] == 999 &&
        this.board[i][4] == 999
      ) {
        this.bingo = true
        return true
      }
    }
    return false
  }

  this.checkColumnForBingo = function () {
    for (let i = 0; i < 5; i++) {
      if (
        this.board[0][i] == 999 &&
        this.board[1][i] == 999 &&
        this.board[2][i] == 999 &&
        this.board[3][i] == 999 &&
        this.board[4][i] == 999
      ) {
        this.bingo = true
        return true
      }
    }
    return false
  }
}

let allBoards = []
let finishedBoardsHierarchical = []
let lastWinningNumber

for (let i = 0; i < numberBoards.length; i++) {
  allBoards.push(new Board(numberBoards[i]))
}

for (let j = 0; j < drawingNumbers.length; j++) {
  for (let k = 0; k < allBoards.length; k++) {
    const bingoBefore = allBoards[k].bingo
    allBoards[k].markNumber(drawingNumbers[j])
    allBoards[k].checkRowForBingo()
    allBoards[k].checkColumnForBingo()
    const bingoAfter = allBoards[k].bingo

    if (bingoBefore != bingoAfter) {
      finishedBoardsHierarchical.push(k)
      if (finishedBoardsHierarchical.length == 100) {
        lastWinningNumber = drawingNumbers[j]
      }
    }
  }
}

const lastWinningBoard =
  finishedBoardsHierarchical[finishedBoardsHierarchical.length - 1]
let sumOfUnmarkedNumbersOnWinningBoard = 0

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (allBoards[lastWinningBoard].board[i][j] != 999) {
      sumOfUnmarkedNumbersOnWinningBoard +=
        allBoards[lastWinningBoard].board[i][j]
    }
  }
}
console.log(sumOfUnmarkedNumbersOnWinningBoard*lastWinningNumber)
