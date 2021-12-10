import input from "./input.json";

let inputSplit = input.map((s) => s.split(""));
let resultSum = 0;

for (let i in inputSplit) {
  let lastOpenedBracketStack = [];
  for (let j in inputSplit[i]) {
    const currentValue = inputSplit[i][j];

    if (isOpeningBracket(currentValue)) {
      lastOpenedBracketStack.push(currentValue);
    }
    if (isClosingBracket(currentValue)) {
      const lastOpenedBracket =
        lastOpenedBracketStack[lastOpenedBracketStack.length - 1];
      if (areBracketsCompatible(lastOpenedBracket, currentValue)) {
        lastOpenedBracketStack.pop();
      } else {
        addPoints(currentValue);
        break;
      }
    }
  }
}

function isClosingBracket(value) {
  if (["}", "]", ")", ">"].includes(value)) {
    return true;
  } else return false;
}

function isOpeningBracket(value) {
  if (["{", "[", "(", "<"].includes(value)) {
    return true;
  } else return false;
}

function areBracketsCompatible(opening, closing) {
  if (opening == "{" && closing == "}") {
    return true;
  } else if (opening == "(" && closing == ")") {
    return true;
  } else if (opening == "[" && closing == "]") {
    return true;
  } else if (opening == "<" && closing == ">") {
    return true;
  } else return false;
}

function addPoints(value) {
  if (value == ")") {
    resultSum += 3;
  } else if (value == "]") {
    resultSum += 57;
  } else if (value == "}") {
    resultSum += 1197;
  } else if (value == ">") {
    resultSum += 25137;
  }
}
console.log(resultSum)