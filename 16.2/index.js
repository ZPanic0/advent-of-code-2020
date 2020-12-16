let [constraints, myTicket, otherTickets] = require('fs')
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

const mapFields = () => {
    let constraintEntries = Object.entries(constraints)
    let unmatchedIndexes = Array.from({ length: constraintEntries.length }, (_, index) => index)
    const resolvedValues = {}

    while (constraintEntries.length) {
        for (let index of unmatchedIndexes) {
            const column = validTickets.map(ticket => ticket[index])
            const results = constraintEntries
                .filter(([, set]) => column
                    .every(value => set
                        .has(value)))

            if (results.length !== 1) continue

            const [name] = results[0]
            resolvedValues[name] = index
            constraintEntries = constraintEntries.filter(([entryName]) => entryName !== name)
            unmatchedIndexes = unmatchedIndexes.filter(unmatchedIndex => unmatchedIndex !== index)

        }
    }

    return resolvedValues
}

const mapConstraints = () => constraints
    .split('\n')
    .reduce((accumulator, constraint) => {
        const [name, ranges] = constraint.split(': ')

        accumulator[name] = new Set(
            ranges
                .split(' or ')
                .map(generateRange)
                .reduce((rangeAccumulator, range) => [...rangeAccumulator, ...range], [])
        )

        return accumulator

    }, {})

const mapTickets = () => otherTickets
    .split('\n')
    .slice(1)
    .map(ticket => ticket
        .split(',')
        .map(Number)
    )

constraints = mapConstraints()
otherTickets = mapTickets()

const constraintSets = Object.values(constraints)

const validTickets = otherTickets
    .filter(ticket => ticket
        .every(value => constraintSets
            .some(set => set
                .has(value))))

const resolvedValues = mapFields()

const departureIndexes = Object
    .entries(resolvedValues)
    .filter(([name]) => name.includes('departure'))
    .map(([, value]) => value)
const myTicketValues = myTicket.split('\n')[1].split(',').map(Number)

const product = departureIndexes
    .reduce((accumulator, index) => accumulator * myTicketValues[index], 1)

console.log(product)

