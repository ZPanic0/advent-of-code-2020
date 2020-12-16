let [constraints, _, otherTickets] = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n\n')

const generateRange = range => {
    const [leftOperand, rightOperand] = range.split('-').map(Number)

    return Array.from(
        { length: rightOperand - leftOperand + 1 },
        (_, index) => index + leftOperand
    )
}

constraints = constraints
    .split('\n')
    .reduce((accumulator, constraint) => {
        constraint
            .split(': ')[1]
            .split(' or ')
            .map(generateRange)
            .reduce((rangeAccumulator, range) => [...rangeAccumulator, ...range], [])
            .map(value => accumulator.add(value))

        return accumulator

    }, new Set())

const result = otherTickets
    .split('\n')
    .slice(1)
    .map(ticket => ticket
        .split(',')
        .map(Number)
        .filter(value => !constraints.has(value))
        .reduce((sum, value) => sum + value, 0))
    .reduce((sum, value) => sum + value, 0)

console.log(result)
