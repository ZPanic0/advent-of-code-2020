const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n\n')

let sum = 0
for (let input of inputs) {
    const anyGroupMemberAnswers = input
        .replace(/\n/g, '')
        .split('')
        .reduce((accumulator, thisLetter) => accumulator.add(thisLetter), new Set())

    const individualMemberAnswers = input
        .split('\n')
        .map(singleMemberAnswers => singleMemberAnswers.split(''))

    sum += [...anyGroupMemberAnswers]
        .reduce((accumulator, answer) => accumulator += individualMemberAnswers
            .every(answerSet => answerSet.includes(answer)), 0)
}

console.log(sum)