const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

const earliestDepartureTime = Number(inputs[0])
const busIds = inputs[1].split(',').filter(id => id !== 'x')

const { product, id } = busIds.map(id => {
    const multiplier = Math.ceil(earliestDepartureTime / id)

    return { product: id * multiplier, id }
}).sort((a, b) => a.product - b.product)[0]

console.log((product - earliestDepartureTime) * id)
