import fs from "fs";
const test = true;
const input = test
  ? fs.readFileSync("testInput.txt").toString()
  : fs.readFileSync("input.txt").toString();

let polymer = input.split("\n\n")[0];
let instructions = input
  .split("\n\n")[1]
  .split("\n")
  .map((s) => s.split(" -> "));
let initialPairs = [];
let pairCounts = {};
let pairToPairs = {};

function initializePolymerPairs() {
  for (let i = 0; i < polymer.length - 1; i++) {
    initialPairs.push(polymer.substring(i, i + 2));
  }
}

function initializePairs() {
  instructions.forEach((s) => {
    pairCounts[s[0]] = 0;
  });

  initialPairs.forEach((s) => pairCounts[s]++);
}

function initializeInstructions() {
  for (const value of instructions) {
    const firstPair = value[0].substring(0, 1) + value[1];
    const secondPair = value[1] + value[0].substring(1, 2);

    pairToPairs[value[0]] = [firstPair, secondPair];
  }
}

function goStep() {
  const pairCountLocal = {};
  for (const [key, value] of Object.entries(pairCounts)) {
    pairCountLocal[key] = 0;
  }

  for (const [key, value] of Object.entries(pairCounts)) {
    const pairCount = pairCounts[key];
    const followingPairs = pairToPairs[key];
    pairCountLocal[followingPairs[0]] += pairCount;
    pairCountLocal[followingPairs[1]] += pairCount;
  }

  for (const [key, value] of Object.entries(pairCounts)) {
    pairCounts[key] = pairCountLocal[key];
  }
}

function goXSteps(x) {
  for (let i = 0; i < x; i++) {
    polymer = goStep();
  }
}

function getMostCommonElement() {
  const arr = polymer.split("");
  const counts = {};

  for (const num of arr) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
}

function getAmountOfElements() {
  let localCount = {};
  for (const [key, value] of Object.entries(pairCounts)) {
    localCount[key.substring(0, 1)] = 0;
  }
  for (const [key, value] of Object.entries(pairCounts)) {
    for (let i in instructions) {
      if (instructions[i][0] == key) {
        localCount[key.substring(0, 1)] += value;
        localCount[key.substring(1, 2)] += value;
        localCount[instructions[i][1]] += value;
      }
    }
  }
  console.log(localCount);
}

initializePolymerPairs();
initializePairs();
initializeInstructions();
goXSteps(8);
getAmountOfElements();

// const countOfValues = getMostCommonElement();
// const highestAmount = Object.entries(countOfValues).reduce((a, b) =>
//   a[1] > b[1] ? a : b
// )[1];
// const lowestAmount = Object.entries(countOfValues).reduce((a, b) =>
//   a[1] < b[1] ? a : b
// )[1];
// console.log(highestAmount - lowestAmount);
