const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

const findPartition = (input, lowCharacter, upperBound) => {
    let lowerBound = 0
    for (let character of input.split('')) {
        if (character === lowCharacter) {
            upperBound -= Math.ceil((upperBound - lowerBound) / 2)

        } else {
            lowerBound += Math.ceil((upperBound - lowerBound) / 2)
        }

    }
    return lowerBound
}

const findRow = input => findPartition(input.slice(0, 7), 'F', 127)

const findColumn = input => findPartition(input.slice(7, 10), 'L', 7)

const findId = input => (8 * findRow(input) + findColumn(input))

const ids = inputs
    .map(findId)
    .sort((a, b) => a - b)

for (let i = 0; i < ids.length; i++) {
    const thisId = ids[i]

    if (ids[i + 1] == thisId + 2) {
        console.log(thisId + 1)
        return
    }
}
