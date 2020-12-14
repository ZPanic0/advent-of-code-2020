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


const memory = {}

for (let { mask, operations } of inputs) {
    for (let [address, value] of operations) {
        memory[address] = value
            .toString(2)
            .padStart(precision, 0)
            .split('')
            .map((thisChar, index) => isNaN(mask[index]) ? thisChar : mask[index])
            .join('')
    }
}

const result = Object
    .values(memory)
    .reduce((accumulator, value) => accumulator + parseInt(value, 2), 0)

console.log(result)

