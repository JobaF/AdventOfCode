import fs from "fs";
const test = false;
const input = test
  ? fs.readFileSync("testInput.txt").toString()
  : fs.readFileSync("input.txt").toString();

let hashPositions = input
  .split("\n\n")[0]
  .split("\n")
  .map((value) => value.split(",").map(Number));
let foldInstructions = input
  .split("\n\n")[1]
  .split("\n")
  .map((value) => value.split(" ")[2])
  .map((s) => s.split("="));

const maxY = Math.max.apply(
  Math,
  hashPositions.map(function (i) {
    return i[1];
  })
);

const maxX = Math.max.apply(
  Math,
  hashPositions.map(function (i) {
    return i[0];
  })
);

const rowsLength = maxY + 3;
const columnsLength = maxX + 1;

//fill array
let hashes = Array.from({ length: rowsLength }, () =>
  Array.from({ length: columnsLength }, () => " ")
);

function fillInHashes() {
  for (let i = 0; i < hashPositions.length; i++) {
    const x = hashPositions[i][0];
    const y = hashPositions[i][1];
    hashes[y][x] = "#";
  }
}

function foldHashes(direction, coordinate) {
  let resulting = Array.from({ length: hashes.length }, () =>
    Array.from({ length: hashes[0].length }, () => " ")
  );
  if (direction == "x") {
    const xLength = coordinate;
    const yLength = resulting.length;

    for (let i = 0; i < yLength; i++) {
      for (let j = 0; j < xLength; j++) {
        if (
          hashes[i][j] === "#" ||
          hashes[i][resulting[i].length - j - 1] === "#"
        ) {
          resulting[i][j] = "#";
        } else resulting[i][j] = " ";
      }
      resulting[i].length = xLength;
    }
  } else if (direction == "y") {
    const yLength = coordinate;
    const xLength = resulting[0].length;

    for (let i = 0; i < yLength; i++) {
      for (let j = 0; j < xLength; j++) {
        if (
          hashes[i][j] === "#" ||
          hashes[resulting.length - i - 1][j] === "#"
        ) {
          resulting[i][j] = "#";
        } else resulting[i][j] = " ";
      }
    }
    resulting.length = yLength;
  }

  hashes = resulting;
}

fillInHashes();

foldInstructions.forEach(([a, b]) => foldHashes(a, b));
console.log(hashes.map((s) => s.join("")).join("\n"));
