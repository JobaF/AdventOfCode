import input from "./input.json";

let octopusField = input.map((s) => s.split("").map(Number));
let alreadyFlashed = Array(10)
  .fill(null)
  .map(() => Array(10).fill(false));

// Step 1. Increase energy of each O. by 1
// Step 2. Any O. w. energy > 9 -> flash
// Any flash: increase adjacent O. by 1
// Only one flash possible per increment (array with already flashed)

function increaseOctopusEnergy() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      octopusField[i][j]++;

      if (octopusField[i][j] > 9 && alreadyFlashed[i][j] == false) {
        alreadyFlashed[i][j] = true;
        increaseAdjacentOctopusRecursive(i, j);
      }
    }
  }
}

function isFlashed(i, j) {
  if (i < 0 || i > 9 || j < 0 || j > 9) return false;
  if (alreadyFlashed[i][j] == true) {
    return true;
  } else return false;
}

function setFlashed(i, j) {
  alreadyFlashed[i][j] = true;
}

function resetFlashedArray() {
  alreadyFlashed = Array(10)
    .fill(null)
    .map(() => Array(10).fill(false));
}

function increaseSpecificOctopusAndReturnValue(i, j) {
  if (i < 0 || i > 9 || j < 0 || j > 9) return 0;
  else {
    octopusField[i][j]++;
    return octopusField[i][j];
  }
}

function increaseAdjacentOctopusRecursive(i, j) {
  let topLeft = increaseSpecificOctopusAndReturnValue(i - 1, j - 1);
  let topMiddle = increaseSpecificOctopusAndReturnValue(i - 1, j);
  let topRight = increaseSpecificOctopusAndReturnValue(i - 1, j + 1);
  let left = increaseSpecificOctopusAndReturnValue(i, j - 1);
  let right = increaseSpecificOctopusAndReturnValue(i, j + 1);
  let bottomLeft = increaseSpecificOctopusAndReturnValue(i + 1, j - 1);
  let bottomMiddle = increaseSpecificOctopusAndReturnValue(i + 1, j);
  let bottomRight = increaseSpecificOctopusAndReturnValue(i + 1, j + 1);

  if (topLeft > 9 && !isFlashed(i - 1, j - 1)) {
    setFlashed(i - 1, j - 1);
    increaseAdjacentOctopusRecursive(i - 1, j - 1);
  }
  if (topMiddle > 9 && !isFlashed(i - 1, j)) {
    setFlashed(i - 1, j);
    increaseAdjacentOctopusRecursive(i - 1, j);
  }
  if (topRight > 9 && !isFlashed(i - 1, j + 1)) {
    setFlashed(i - 1, j + 1);
    increaseAdjacentOctopusRecursive(i - 1, j + 1);
  }
  if (left > 9 && !isFlashed(i, j - 1)) {
    setFlashed(i, j - 1);
    increaseAdjacentOctopusRecursive(i, j - 1);
  }
  if (right > 9 && !isFlashed(i, j + 1)) {
    setFlashed(i, j + 1);
    increaseAdjacentOctopusRecursive(i, j + 1);
  }
  if (bottomLeft > 9 && !isFlashed(i + 1, j - 1)) {
    setFlashed(i + 1, j - 1);
    increaseAdjacentOctopusRecursive(i + 1, j - 1);
  }
  if (bottomMiddle > 9 && !isFlashed(i + 1, j)) {
    setFlashed(i + 1, j);
    increaseAdjacentOctopusRecursive(i + 1, j);
  }
  if (bottomRight > 9 && !isFlashed(i + 1, j + 1)) {
    setFlashed(i + 1, j + 1);
    increaseAdjacentOctopusRecursive(i + 1, j + 1);
  }
}

function resetFlashedOctopuses() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (alreadyFlashed[i][j] == true) {
        octopusField[i][j] = 0;
      }
    }
  }
}

function checkForSynchroneFlash() {
  return octopusField.every((s) => s.every((elem) => elem == true));
}


function goXSteps(x) {
  for (let i = 0; i < x; i++) {
    increaseOctopusEnergy();
    resetFlashedOctopuses();
    if(checkForSynchroneFlash()) console.log(i)
    resetFlashedArray();
  }
}

goXSteps(500);
