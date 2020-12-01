const input = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(Number)
    .sort((x, y) => y - x)

const target = 2020

const scan = () => {
    for (let aIndex = 0; aIndex < input.length - 3; aIndex++) {
        for (let bIndex = aIndex + 1; bIndex < input.length - 2; bIndex++) {
            const partialSum = input[aIndex] + input[bIndex]

            //skip starting the third scan if we are already over our target
            if (partialSum > target) break

            for (let cIndex = input.length - 1; cIndex > 0; cIndex--) {
                const sum = partialSum + input[cIndex]
                if (sum > target) break
                if (sum === target) return [input[aIndex], input[bIndex], input[cIndex]]
            }
        }
    }
    throw new Error('No match')
}

console.log(scan().reduce((previous, current) => previous * current))