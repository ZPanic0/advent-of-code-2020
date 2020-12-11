let inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(input => input.split(''))

const getSeatValue = (thisInputs, initialX, initialY, xModifier, yModifier) => {
    const [x, y] = [initialX + xModifier, initialY + yModifier]

    if (!thisInputs[x] || !thisInputs[x][y]) return false
    if (thisInputs[x][y] === '.') return getSeatValue(thisInputs, x, y, xModifier, yModifier)
    return thisInputs[x][y]
}

const getOccupiedNeighborsCount = (thisInputs, x, y) => [
    getSeatValue(thisInputs, x, y, -1, -1), //Upper left seat
    getSeatValue(thisInputs, x, y, 0, -1), //Upper middle seat
    getSeatValue(thisInputs, x, y, 1, -1), //Upper right seat
    getSeatValue(thisInputs, x, y, -1, 0), //Left seat
    getSeatValue(thisInputs, x, y, 1, 0), //Right seat
    getSeatValue(thisInputs, x, y, -1, 1), //Lower left seat
    getSeatValue(thisInputs, x, y, 0, 1), //Lower middle seat
    getSeatValue(thisInputs, x, y, 1, 1) //Lower right seat
].filter(seatValue => seatValue === '#').length

const getNextSeatValue = (lastArray, x, y) => {
    const occupiedCount = getOccupiedNeighborsCount(lastArray, x, y)

    switch (lastArray[x][y]) {
        case '#':
            return occupiedCount >= 5 ? 'L' : '#'
        case 'L':
            return occupiedCount ? 'L' : '#'
        case '.':
            return '.'
        default:
            throw new Error('Input not implemented.')
    }
}

const simulate = lastArray => {
    let nextArray = []

    for (let x = 0; x < lastArray.length; x++) {
        nextArray[x] = []
        for (let y = 0; y < lastArray[x].length; y++) {
            nextArray[x][y] = getNextSeatValue(inputs, x, y)
        }
    }

    return nextArray
}

let lastSnapshot = JSON.stringify(inputs)
let thisSnapshot

while (lastSnapshot !== thisSnapshot) {
    lastSnapshot = thisSnapshot

    const nextArray = simulate(inputs)

    inputs = nextArray
    thisSnapshot = JSON.stringify(nextArray)
}

console.log(thisSnapshot
    .split('')
    .filter(character => character === '#')
    .length)
