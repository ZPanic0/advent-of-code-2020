const fs = require('fs')

const fetchFreshInputs = () => fs
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(input => {
        const [operation, modifier] = input.split(' ')

        return {
            operation,
            argument: Number(modifier),
            timesExecuted: 0
        }
    })

const evaluate = inputs => {
    let accumulator = 0
    let pointer = 0

    while (inputs[pointer].timesExecuted < 1) {
        const instruction = inputs[pointer]

        if (instruction.operation === 'jmp' && instruction.argument === 0) return false

        switch (instruction.operation) {
            case 'acc':
                accumulator += instruction.argument
                pointer++
                break
            case 'jmp':
                pointer += instruction.argument
                break
            case 'nop':
                pointer++
                break
            case '':
                //Program terminated successfully
                return accumulator
            default:
                throw new Error('Unsupported operation.')
        }

        instruction.timesExecuted++
    }

    return false
}

const bruteForce = () => {
    let result
    let index = 0

    do {
        const inputs = fetchFreshInputs()

        if (!inputs[index])
            throw new Error('Reached the end of the file without discovering a working permutation.')
        if (inputs[index].operation === 'acc') {
            index++
            continue
        }

        inputs[index].operation = inputs[index].operation === 'jmp' ? 'nop' : 'jmp'

        result = evaluate(inputs)

        index++
    } while (!result)

    return result
}

console.log(bruteForce())
