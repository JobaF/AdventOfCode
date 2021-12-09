import input from './input.json'

const heatmap = input.map((s) => s.split('').map(Number))
let lowPointsSummed = 0;

for (let i = 0; i < heatmap.length; i++) {
  for (let j = 0; j < heatmap[i].length; j++) {
    const currentValue = heatmap[i][j]
    let topValue = initializeTopValue(i, j)
    let rightValue = initializeRightValue(i, j)
    let bottomValue = initializeBottomValue(i, j)
    let leftValue = initializeLeftValue(i, j)

    if(currentValue < topValue && currentValue < bottomValue && currentValue < rightValue && currentValue < leftValue){
        lowPointsSummed += currentValue+1;
    }    
  }
}

function initializeTopValue(i, j) {
  try {
    return heatmap[i - 1][j]
  } catch {
    return 10
  }
}
function initializeRightValue(i, j) {
  if (heatmap[i][j + 1] === undefined) {
    return 10
  } else {
    return heatmap[i][j + 1]
  }
}
function initializeBottomValue(i, j) {
  try {
    return heatmap[i + 1][j]
  } catch {
    return 10
  }
}
function initializeLeftValue(i, j) {
  if (heatmap[i][j - 1] === undefined) {
    return 10
  } else {
    return heatmap[i][j - 1]
  }
}

console.log(lowPointsSummed)
