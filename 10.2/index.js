const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b)

const maxInput = inputs[inputs.length - 1]
const paths = { [maxInput]: 1 }
const variability = [1, 2, 3]

const nodes = inputs
    .reduce((accumulator, input) => ({ ...accumulator, [input]: true }), { 0: true })

for (let index = maxInput - 1; index >= 0; index--) {
    if (!nodes[index]) continue

    paths[index] = variability
        .map(thisVariance => paths[index + thisVariance] || 0)
        .reduce((a, b) => a + b, 0)
}

console.log(paths[0])
