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
    const [firstIndex, secondIndex] = range.split('-').map(Number)

    validCount +=
        password[firstIndex - 1] === character ^
            password[secondIndex - 1] == character
}

console.log(validCount)
