const countCollisions = require('./countCollisions')
const input = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

const matchCharacter = '#'

console.log([
    countCollisions(input, 1, 1, matchCharacter),
    countCollisions(input, 3, 1, matchCharacter),
    countCollisions(input, 5, 1, matchCharacter),
    countCollisions(input, 7, 1, matchCharacter),
    countCollisions(input, 1, 2, matchCharacter)
].reduce((accumulator, current) => accumulator * current))
