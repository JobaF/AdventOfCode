import input from './input.json'

function createAndFillTwoDArray({ rows, columns, defaultValue }) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: columns }, () => defaultValue),
  )
}

const amountX = 1000
const amountY = 1000
let hydrothermalVents = createAndFillTwoDArray({
  rows: 1000,
  columns: 1000,
  defaultValue: Number(0),
})

for (let i = 0; i < input.length; i++) {
  const fourInputs = [
    input[i].split('->')[0].split(',')[0],
    input[i].split('->')[0].split(',')[1],
    input[i].split('->')[1].split(',')[0],
    input[i].split('->')[1].split(',')[1],
  ]
  const x1 = Number(fourInputs[0])
  const y1 = Number(fourInputs[1])
  const x2 = Number(fourInputs[2])
  const y2 = Number(fourInputs[3])

  if (x1 == x2) {
    const lengthBetweenYPoints = Math.abs(y2 - y1)
    if (y1 > y2) {
      for (let j = 0; j <= lengthBetweenYPoints; j++) {
        hydrothermalVents[x1][y2 + j] += 1
      }
    }
    else if (y2 > y1) {
      for (let j = 0; j <= lengthBetweenYPoints; j++) {
        hydrothermalVents[x1][y1 + j] += 1
      }
    }
  }
  else if (y1 == y2) {
    const lengthBetweenYPoints = Math.abs(x2 - x1)
    if (x1 > x2) {
      for (let j = 0; j <= lengthBetweenYPoints; j++) {
        hydrothermalVents[x2 + j][y2] += 1
      }
    }
    else if (x2 > x1) {
      for (let j = 0; j <= lengthBetweenYPoints; j++) {
        hydrothermalVents[x1 + j][y1] += 1
      }
    }
  }
}

let amountOverlaps = 0;

for (let c = 0; c < 1000; c++) {
  for (let d = 0; d < 1000; d++) {
      if(hydrothermalVents[c][d] >=2){
          amountOverlaps+=1
      }
  }
}

console.log(amountOverlaps)