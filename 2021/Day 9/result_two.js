import input from './input.json'

const heatmap = input.map((s) => s.split('').map(Number))
let basinSizes = []
let counter = 0

for (let i = 0; i < heatmap.length; i++) {
  for (let j = 0; j < heatmap[i].length; j++) {
    const currentValue = heatmap[i][j]
    let topValue = initializeTopValue(i, j)
    let rightValue = initializeRightValue(i, j)
    let bottomValue = initializeBottomValue(i, j)
    let leftValue = initializeLeftValue(i, j)

    if (
      currentValue < topValue &&
      currentValue < bottomValue &&
      currentValue < rightValue &&
      currentValue < leftValue
    ) {
      goInAllDirections(i, j)
      basinSizes.push(counter)
      counter = 0;
    }
  }
}

function initializeTopValue(i, j) {
  try {
    return heatmap[i - 1][j]
  } catch {
    return 9
  }
}
function initializeRightValue(i, j) {
  if (heatmap[i][j + 1] === undefined) {
    return 9
  } else {
    return heatmap[i][j + 1]
  }
}
function initializeBottomValue(i, j) {
  try {
    return heatmap[i + 1][j]
  } catch {
    return 9
  }
}
function initializeLeftValue(i, j) {
  if (heatmap[i][j - 1] === undefined) {
    return 9
  } else {
    return heatmap[i][j - 1]
  }
}

function goInAllDirections(i, j) {
  if (heatmap[i][j] != 9) {
    heatmap[i][j] = 9
    counter++
    if (initializeLeftValue(i, j) != 9) {
      goInAllDirections(i, j - 1)
    }
    if (initializeRightValue(i, j) != 9) {
      goInAllDirections(i, j + 1)
    }
    if (initializeTopValue(i, j) != 9) {
      goInAllDirections(i - 1, j)
    }
    if (initializeBottomValue(i, j) != 9) {
      goInAllDirections(i + 1, j)
    }
  }
}

basinSizes.sort(function(a, b) {
    return b-a;
  });
console.log(basinSizes[0] * basinSizes[1] * basinSizes[2])