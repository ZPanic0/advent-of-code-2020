const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(input => [input[0], Number(input.slice(1))])

const convertDirectionToCardinal = direction => {
    switch (direction % 360) {
        case 0:
            return 'E'
        case 90:
        case -270:
            return 'S'
        case 180:
        case -180:
            return 'W'
        case 270:
        case -90:
            return 'N'
        default:
            throw new Error(`Unexpected direction: ${direction}`)
    }
}

const navigate = (currentLocation, input) => {
    const [instruction, magnitude] = input

    switch (instruction) {
        case 'N':
            currentLocation.y -= magnitude
            break
        case 'S':
            currentLocation.y += magnitude
            break
        case 'W':
            currentLocation.x -= magnitude
            break
        case 'E':
            currentLocation.x += magnitude
            break
        case 'L':
            currentLocation.direction -= magnitude
            break
        case 'R':
            currentLocation.direction += magnitude
            break
        case 'F':
            navigate(currentLocation, [convertDirectionToCardinal(currentLocation.direction), magnitude])
            break
        default:
            throw new Error(`Unhandled instruction: ${instruction}`)
    }

    return currentLocation
}

const { x, y } = inputs.reduce(navigate, { x: 0, y: 0, direction: 0 })

console.log(Math.abs(x) + Math.abs(y))
