/**
 * Counts the number of occurrences of a character in a given input string.
 * 
 * @param {String} input The given input to count characters in
 * @param {String} match The character to match against
 */
module.exports = function count(input, match) {
    return input
        .split('')
        .reduce((accumulator, current) => accumulator += current === match ? 1 : 0, 0)
}