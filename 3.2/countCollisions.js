/**Counts the number of collisions on a given grid and returns the result
 * 
 * @param {Array<String>} input The wrapping puzzle input to test against
 * @param {Number} xMove The number of units to move along the x axis per turn
 * @param {Number} yMove The number of units to move along the y axis per turn
 * @param {String} matchCharacter The character to consider as a collision in a given space of the input
 */
module.exports = function countCollisions(input, xMove, yMove, matchCharacter) {
    let counter = 0

    for (let x = xMove, y = yMove; y < input.length - 1; x += xMove, y += yMove) {
        const thisCharacter = input[y][x % (input[0].length)]
        counter += thisCharacter === matchCharacter
    }

    return counter
}
