let inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

const toPointString = ({ x, y, z }) => `${x},${y},${z}`

const toPointObject = pointString => {
    const [x, y, z] = pointString.split(',').map(Number)
    return { x, y, z }
}

const mapInputs = () => {
    const thisGrid = new Set()

    for (let y = 0; y < inputs.length; y++) {
        const lineElements = inputs[y].split('')

        for (let x = 0; x < lineElements.length; x++) {
            lineElements[x] === '#' && thisGrid.add(`${x},${y},0`)
        }
    }

    return thisGrid
}

function* getAdjacentPoints(thisGrid, { x, y, z }) {
    for (let xIndex = x - 1; xIndex <= x + 1; xIndex++) {
        for (let yIndex = y - 1; yIndex <= y + 1; yIndex++) {
            for (let zIndex = z - 1; zIndex <= z + 1; zIndex++) {
                if (xIndex == x && yIndex === y && zIndex === z) continue
                const thisPoint = { x: xIndex, y: yIndex, z: zIndex }
                yield [thisPoint, thisGrid.has(toPointString(thisPoint))]
            }
        }
    }
}

const simulatePoint = (thisGrid, point) => {
    const pointString = toPointString(point)
    const isActive = thisGrid.has(pointString)
    const neighbors = [...getAdjacentPoints(thisGrid, point)]
    const activeNeighborCount = neighbors.reduce((accumulator, [, value]) => accumulator + value, 0)

    if (activeNeighborCount === 3) return true
    if (isActive && activeNeighborCount === 2) return true
    return false
}

const simulate = (oldGrid) => {
    const newGrid = new Set()

    oldGrid.forEach(thisPointString => {
        for (let [neighborPoint] of getAdjacentPoints(oldGrid, toPointObject(thisPointString))) {
            simulatePoint(oldGrid, neighborPoint) && newGrid.add(toPointString(neighborPoint))
        }
    })

    return newGrid
}

let grid = mapInputs()

for (let i = 0; i < 6; i++) {
    grid = simulate(grid)
}

console.log(grid.size)
