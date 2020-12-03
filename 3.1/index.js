const input = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

let counter = 0

for (let x = 3, y = 1; y < input.length - 1; x += 3, y += 1) {
    const thisCharacter = input[y][x % (input[0].length)]
    counter += thisCharacter === '#'
}

console.log(counter)