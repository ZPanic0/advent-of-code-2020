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

const isValidColor = /^#[0-9a-f]{6}$/
const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

console.log(inputs.filter(input => {
    if (!(input.byr &&
        input.iyr &&
        input.eyr &&
        input.hgt &&
        input.hcl &&
        input.ecl &&
        input.pid)) return false

    const birthYear = Number(input.byr)
    if (birthYear < 1920 || birthYear > 2002) return false

    const issueYear = Number(input.iyr)
    if (issueYear < 2010 || issueYear > 2020) return false

    const expirationYear = Number(input.eyr)
    if (expirationYear < 2020 || expirationYear > 2030) return false

    const height = Number(input.hgt.replace('cm', '').replace('in', ''))
    if (input.hgt.includes('cm')) {
        if (height < 150 || height > 193) return false
    } else if (input.hgt.includes('in')) {
        if (height < 59 || height > 76) return false
    } else {
        return false
    }

    if (!isValidColor.test(input.hcl)) return false

    if (!validEyeColors.includes(input.ecl)) return false

    if (input.pid.length !== 9) return false

    return true
}
).length)