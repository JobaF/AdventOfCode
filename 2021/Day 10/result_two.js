import input from "./input.json";

let inputSplit = input.map((s) => s.split(""));
let allPoints = [];


for (let i = 0; i < inputSplit.length; i++) {
  let lastOpenedBracketStack = [];
  for (let j = 0; j < inputSplit[i].length; j++) {
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
        break;
      }
    }

    // Wenn am Ende der Zeile angekommen und kein Abbruch durch 'break'
    if (j == inputSplit[i].length - 1) {
      const closingBracketSequence = getClosingBracketSequence(
        lastOpenedBracketStack
      );
      allPoints.push(getPointsFrom(closingBracketSequence));
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

function getClosingBracketSequence(openingBrackets) {
  let closingBracketSequence = [];
  for (let i = openingBrackets.length - 1; i >= 0; i--) {
    const currentValue = openingBrackets[i];
    if (currentValue == "{") {
      closingBracketSequence.push("}");
    } else if (currentValue == "[") {
      closingBracketSequence.push("]");
    } else if (currentValue == "<") {
      closingBracketSequence.push(">");
    } else if (currentValue == "(") {
      closingBracketSequence.push(")");
    }
  }
  return closingBracketSequence;
}

function getPointsFrom(closingBrackets) {
  let localPoints = 0;

  for (let i in closingBrackets) {
    const bracketScore = getPointFor(closingBrackets[i]);
    localPoints *= 5;
    localPoints += bracketScore;
  }

  return localPoints;
}

function getPointFor(bracket) {
  if (bracket == "]") {
    return 2;
  } else if (bracket == ")") {
    return 1;
  } else if (bracket == "}") {
    return 3;
  } else if (bracket == ">") {
    return 4;
  }
}

allPoints = allPoints.sort(function (a, b) {
  return a - b;
});
console.log(allPoints[Math.floor(allPoints.length / 2)]);
