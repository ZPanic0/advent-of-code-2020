const inputs = require('fs')
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

const evaluate = () => {
    let accumulator = 0
    let pointer = 0

    while (inputs[pointer].timesExecuted < 1) {
        const instruction = inputs[pointer]

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
            default:
                throw new Error('Unsupported operation.')
        }

        instruction.timesExecuted++
    }

    return accumulator
}

console.log(evaluate())