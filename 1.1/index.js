const input = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(Number)
    .sort((x, y) => y - x)

const target = 2020

const scan = () => {
    for (let aIndex = 0; aIndex < input.length; aIndex++) {
        for (let bIndex = input.length - 1; bIndex > 0; bIndex--) {
            const sum = input[aIndex] + input[bIndex]
            if (sum > target) break
            if (sum === target) return [input[aIndex], input[bIndex]]
        }
    }
    throw new Error('No match')
}

console.log(scan().reduce((previous, current) => previous * current))