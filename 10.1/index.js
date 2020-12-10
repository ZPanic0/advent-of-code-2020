const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(Number)
    .sort((a, b) => a - b)

const { oneVarianceCount, threeVarianceCount } = inputs
    .reduce((accumulator, input) => {
        const difference = input - accumulator.lastInput
        accumulator.oneVarianceCount += (difference === 1)
        accumulator.threeVarianceCount += (difference === 3)

        accumulator.lastInput = input

        return accumulator
    }, {
        lastInput: 0, //The charger is considered an initial step of 0
        oneVarianceCount: 0,
        threeVarianceCount: 1 //Precounting the last step to the device
    })

console.log(oneVarianceCount * threeVarianceCount)
