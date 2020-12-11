let inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(input => input.split(''))

const getOccupiedNeighborsCount = (thisInputs, x, y) => {
    return 0
        //Upper left seat
        + !!(thisInputs[x - 1] && thisInputs[x - 1][y - 1] === '#')
        //Upper middle seat
        + !!(thisInputs[x] && thisInputs[x][y - 1] === '#')
        //Upper right seat
        + !!(thisInputs[x + 1] && thisInputs[x + 1][y - 1] === '#')
        //Left seat
        + !!(thisInputs[x - 1] && thisInputs[x - 1][y] === '#')
        //Right seat
        + !!(thisInputs[x + 1] && thisInputs[x + 1][y] === '#')
        //Lower left seat
        + !!(thisInputs[x - 1] && thisInputs[x - 1][y + 1] === '#')
        //Lower middle seat
        + !!(thisInputs[x] && thisInputs[x][y + 1] === '#')
        //Lower right seat
        + !!(thisInputs[x + 1] && thisInputs[x + 1][y + 1] === '#')
}

const getNextSeatValue = (lastArray, x, y) => {
    const occupiedCount = getOccupiedNeighborsCount(lastArray, x, y)

    switch (lastArray[x][y]) {
        case '#':
            return occupiedCount >= 4 ? 'L' : '#'
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