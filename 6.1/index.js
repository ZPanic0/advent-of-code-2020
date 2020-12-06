const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n\n')

let sum = 0
for (let input of inputs) {
    const groupAnswers = input
        .replace(/\n/g, '')
        .split('')
        .reduce((accumulator, thisLetter) => accumulator.add(thisLetter), new Set())

    sum += [...groupAnswers].length
}

console.log(sum)