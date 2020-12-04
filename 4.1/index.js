const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n\n')
    .map(input => input
        .replace(/\n/g, ' ')
        .split(' ')
        .reduce((accumulator, pair) => {
            const [key, value] = pair.split(':')

            accumulator[key] = value

            return accumulator
        }, {})
    )



console.log(inputs.filter(input =>
    input.byr &&
    input.iyr &&
    input.eyr &&
    input.hgt &&
    input.hcl &&
    input.ecl &&
    input.pid
).length)