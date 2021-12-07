import input from './input.json'
import testInput from './test-input.json'

function sumOfOneToN(n) {
  return (n * (n + 1)) / 2
}

const maxValue = Math.max(...input)
const burnedFuelForN = []

for (let i = 0; i < maxValue; i++) {
  let sumOfFuelBurned = 0
  for (let j = 0; j < input.length; j++) {
    sumOfFuelBurned += sumOfOneToN(Math.abs(input[j] - i))
  }
  burnedFuelForN.push(sumOfFuelBurned)
}

console.log(Math.min(...burnedFuelForN))
