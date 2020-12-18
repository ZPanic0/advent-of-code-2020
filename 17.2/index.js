let inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

const toPointString = ({ x, y, z, w }) => `${x},${y},${z},${w}`

const toPointObject = pointString => {
    const [x, y, z, w] = pointString.split(',').map(Number)
    return { x, y, z, w }
}

const mapInputs = () => {
    const thisGrid = new Set()

    for (let y = 0; y < inputs.length; y++) {
        const lineElements = inputs[y]

        for (let x = 0; x < lineElements.length; x++) {
            lineElements[x] === '#' && thisGrid.add(`${x},${y},0,0`)
        }
    }

    return thisGrid
}

function* getAdjacentPoints(thisGrid, { x, y, z, w }) {
    for (let xIndex = x - 1; xIndex <= x + 1; xIndex++) {
        for (let yIndex = y - 1; yIndex <= y + 1; yIndex++) {
            for (let zIndex = z - 1; zIndex <= z + 1; zIndex++) {
                for (let wIndex = w - 1; wIndex <= w + 1; wIndex++) {
                    if (xIndex == x && yIndex === y && zIndex === z && wIndex === w) continue
                    const thisPoint = { x: xIndex, y: yIndex, z: zIndex, w: wIndex }
                    yield [thisPoint, thisGrid.has(toPointString(thisPoint))]
                }
            }
        }
    }
}

function countAdjacentPoints(points) {
    let count = 0

    for (let [, isActive] of points) {
        count += isActive

        if (count > 3) return count //We don't care what the count is after 3.
    }

    return count
}

const simulatePoint = (thisGrid, point) => {
    const pointString = toPointString(point)
    const activeNeighborCount = countAdjacentPoints(getAdjacentPoints(thisGrid, point))

    if (activeNeighborCount === 3) return true
    return thisGrid.has(pointString) && activeNeighborCount === 2
}

const simulate = oldGrid => {
    const newGrid = new Set()
    const shortcutTable = new Map()

    oldGrid.forEach(thisPointString => {
        for (let [neighborPoint] of getAdjacentPoints(oldGrid, toPointObject(thisPointString))) {
            const pointString = toPointString(neighborPoint)
            let result

            //Short circuiting search if it has already been performed this turn.
            if (shortcutTable.has(pointString)) {
                result = shortcutTable.get(pointString)
            } else {
                result = simulatePoint(oldGrid, neighborPoint)
                shortcutTable.set(pointString, result)
            }

            result && newGrid.add(pointString)
        }
    })

    return newGrid
}

let grid = mapInputs()

for (let i = 0; i < 6; i++) {
    grid = simulate(grid)
}

console.log(grid.size)
