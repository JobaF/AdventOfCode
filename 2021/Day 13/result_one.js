import input from "./input.json";
import folds from "./folds.json";

let arrayX = Math.max(...input.map((s) => s.split(",")[0])) + 1;
let arrayY = Math.max(...input.map((s) => s.split(",")[1])) + 1;
let dots = Array(arrayY)
  .fill(null)
  .map(() => Array(arrayX).fill("."));
input.forEach((ele) => {
  const x = Number(ele.split(",")[0]);
  const y = Number(ele.split(",")[1]);
  dots[y][x] = "#";
});

function foldArray(direction, coordinate) {
  let firstFold, secondFold;
  if (direction == "y") {
    firstFold = dots.slice(0, coordinate);
    secondFold = reverseArrayHorizontally([
      ...dots.slice(coordinate + 1, dots.length),
    ]);

    if (firstFold.length == secondFold.length) {
      if (firstFold[0].length == secondFold[0].length) {
        for (let i in firstFold) {
          for (let j in firstFold[i]) {
            if (firstFold[i][j] == "#" || secondFold[i][j] == "#") {
              firstFold[i][j] = "#";
            }
          }
        }
      } else console.log("length incorrect");
    } else console.log("length incorrect");
  } else if (direction == "x") {
    firstFold = dots.map((s) => s.slice(0, coordinate));
    secondFold = reverseArrayVertically([
      ...dots.map((s) => s.slice(coordinate + 1, dots[0].length)),
    ]);

    if (firstFold.length == secondFold.length) {
      if (firstFold[0].length == secondFold[0].length) {
        for (let i in firstFold) {
          for (let j in firstFold[i]) {
            if (firstFold[i][j] == "#" || secondFold[i][j] == "#") {
              firstFold[i][j] = "#";
            }
          }
        }
      } else console.log("length incorrect");
    } else console.log("length incorrect");
  }
  return firstFold;
}

function reverseArrayHorizontally(array) {
  let reversedArray = Array(array.length)
    .fill(null)
    .map(() => Array(array[0].length).fill(""));
  for (let i in array) {
    for (let j in array[i]) {
      reversedArray[i][j] = array[array.length - 1 - i][j];
    }
  }
  return reversedArray;
}

function reverseArrayVertically(array) {
  let reversedArray = Array(array.length)
    .fill(null)
    .map(() => Array(array[0].length).fill(""));
  for (let i in array) {
    for (let j in array[i]) {
      reversedArray[i][j] = array[i][array[i].length - 1 - j];
    }
  }
  return reversedArray;
}

function countDots(array) {
  let sum = 0;
  for (let i in array) {
    for (let j in array[i]) {
      if (array[i][j] == "#") sum++;
    }
  }
  return sum;
}

dots = foldArray("x", 655);
console.log(countDots(dots));
