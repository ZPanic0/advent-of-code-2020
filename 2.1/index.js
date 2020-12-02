const count = require('./count')

const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

//Removing empty entry from the end caused by splitting on newline
inputs.length--

let validCount = 0

for (let input of inputs) {
    let [range, character, password] = input.split(' ')
    character = character.slice(0, 1)
    const [lowerBound, upperBound] = range.split('-').map(Number)

    const thisCount = count(password, character)

    validCount += thisCount >= lowerBound && thisCount <= upperBound ? 1 : 0
}

console.log(validCount)
