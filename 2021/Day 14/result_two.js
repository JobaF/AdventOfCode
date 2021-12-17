import fs from "fs";
const test = false;
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
  let localCountLeft = {};
  let localCountRight = {};
  let localCountResult = {};
  for (const [key, value] of Object.entries(pairCounts)) {
    localCountLeft[key.substring(0, 1)] = 0;
    localCountRight[key.substring(0, 1)] = 0;
    localCountResult[key.substring(0, 1)] = 0;
  }
  for (const [key, value] of Object.entries(pairCounts)) {
    for (let i in instructions) {
      if (instructions[i][0] == key) {
        const leftChar = key.substring(0, 1);
        const rightChar = key.substring(1, 2);
        localCountLeft[leftChar] += value;
        localCountRight[rightChar] += value;
      }
    }
  }
  for (const [key, value] of Object.entries(localCountLeft)) {
    // Take the smaller or equal value
    let baseValue =
      localCountLeft[key] >= localCountRight[key]
        ? localCountRight[key]
        : localCountLeft[key];
    let difference = Math.abs(localCountRight[key] - localCountLeft[key]);
    localCountResult[key] += baseValue + difference;
  }

  //Get most and least element
  const highestValue = Object.entries(localCountResult).reduce((a, b) =>
    a[1] > b[1] ? a : b
  )[1];
  const lowestValue = Object.entries(localCountResult).reduce((a, b) =>
    a[1] < b[1] ? a : b
  )[1];

  console.log("Result: %s", highestValue - lowestValue);
}

initializePolymerPairs();
initializePairs();
initializeInstructions();
goXSteps(40);
getAmountOfElements();
