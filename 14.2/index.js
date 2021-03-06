const memRegex = /mem\[(\d*)\] = (\d*)/
const precision = 36

const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\nmask = ')
    .slice(1)
    .map(input => {
        const lines = input.split('\n')

        return {
            mask: lines[0].split(''),
            operations: lines
                .slice(1)
                .map(line => memRegex
                    .exec(line)
                    .slice(1)
                    .map(Number)
                )
        }
    })

function generateVariances(value) {
    if (value.includes('X')) {
        return [
            ...generateVariances(value.replace('X', 1)),
            ...generateVariances(value.replace('X', 0))
        ]
    }

    return [value]
}

const memory = {}

for (let { mask, operations } of inputs) {
    for (let [address, value] of operations) {

        const maskedAddress = address
            .toString(2)
            .padStart(precision, 0)
            .split('')
            .map((thisChar, index) => mask[index] === '0' ? thisChar : mask[index])
            .join('')

        generateVariances(maskedAddress)
            .map(thisAddress => memory[parseInt(thisAddress, 2)] = value)
    }
}

const result = Object
    .values(memory)
    .reduce((accumulator, value) => accumulator + value, 0)

console.log(result)
