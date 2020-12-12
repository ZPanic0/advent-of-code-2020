const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(input => [input[0], Number(input.slice(1))])

const rotate = (currentLocation, degrees) => {
    const { x, y } = currentLocation
    switch (degrees) {
        case 90:
        case -270:
            currentLocation.x = y
            currentLocation.y = -x
            break
        case 180:
        case -180:
            currentLocation.x = -x
            currentLocation.y = -y
            break
        case 270:
        case -90:
            currentLocation.x = -y
            currentLocation.y = x
            break
        default:
            throw new Error(`Unhandled degrees: ${degrees}`)
    }
}

const navigate = (waypointLocation, shipLocation, input) => {
    const [instruction, magnitude] = input

    switch (instruction) {
        case 'N':
            waypointLocation.y += magnitude
            break
        case 'S':
            waypointLocation.y -= magnitude
            break
        case 'W':
            waypointLocation.x -= magnitude
            break
        case 'E':
            waypointLocation.x += magnitude
            break
        case 'L':
            rotate(waypointLocation, -magnitude)
            break
        case 'R':
            rotate(waypointLocation, magnitude)
            break
        case 'F':
            shipLocation.x += (waypointLocation.x * magnitude)
            shipLocation.y += (waypointLocation.y * magnitude)
            break
        default:
            throw new Error(`Unhandled instruction: ${instruction}`)
    }
}

const waypointLocation = { x: 10, y: 1 }
const shipLocation = { x: 0, y: 0 }

for (let input of inputs) {
    navigate(waypointLocation, shipLocation, input)
}

console.log(Math.abs(shipLocation.x) + Math.abs(shipLocation.y))
