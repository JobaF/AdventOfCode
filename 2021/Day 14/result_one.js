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

function goStep() {
  let newPolymer = [];
  for (let i = 0; i < polymer.length - 1; i++) {
    const polymerPair = polymer.charAt(i) + polymer.charAt(i + 1);
    for (let j = 0; j < instructions.length; j++) {
      if (polymerPair === instructions[j][0]) {
        if (i == polymer.length - 2) {
          newPolymer.push(
            [
              polymer.slice(i, i + 1),
              instructions[j][1],
              polymer.slice(i + 1, i + 2),
            ].join("")
          );
        } else
          newPolymer.push(
            [polymer.slice(i, i + 1), instructions[j][1]].join("")
          );
      }
    }
  }
  return newPolymer.join("");
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

goXSteps(10);

const countOfValues = getMostCommonElement();
const highestAmount = Object.entries(countOfValues).reduce((a, b) =>
  a[1] > b[1] ? a : b
)[1];
const lowestAmount = Object.entries(countOfValues).reduce((a, b) =>
  a[1] < b[1] ? a : b
)[1];
console.log(highestAmount - lowestAmount);
