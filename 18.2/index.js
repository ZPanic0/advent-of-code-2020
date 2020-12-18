const parenthesisRegex = /\([\d\*\+ ]*\)/
const additionRegex = /\d+ \+ \d+/
const ignorables = '( )'
const operators = '*+'

const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

const process = inputString => inputString
    .replace(/[\(\)]/g, '')
    .split(' ')
    .reduce((accumulator, symbol) => {
        if (ignorables.includes(symbol)) return accumulator
        if (accumulator.leftOperand === null) {
            accumulator.leftOperand = Number(symbol)
            return accumulator
        }
        if (operators.includes(symbol)) {
            accumulator.operator = symbol
            return accumulator
        }
        if (accumulator.operator === '*') {
            accumulator.leftOperand = accumulator.leftOperand * Number(symbol)
            return accumulator
        }
        if (accumulator.operator === '+') {
            accumulator.leftOperand = accumulator.leftOperand + Number(symbol)
            return accumulator
        }
        throw new Error(`Parsing error during processing:\naccumulator: ${JSON.stringify(accumulator)}\noperation: ${JSON.stringify(symbol)}`)
    }, { leftOperand: null, operator: null }).leftOperand

//There is a way to combine this call and the anonymous method used for totals
//below, but I'm not interested in pursuing it at the moment.
const precedenceProcess = inputString => {
    while (additionRegex.test(inputString)) {
        const matches = inputString.match(additionRegex)
        if (!matches) break
        inputString = inputString.replace(additionRegex, process(matches[0]))
    }
    return process(inputString)
}

const totals = inputs.map(input => {
    while (parenthesisRegex.test(inputs)) {
        const matches = input.match(parenthesisRegex)
        if (!matches) break
        input = input.replace(parenthesisRegex, precedenceProcess(matches[0]))
    }

    return precedenceProcess(input)
}).reduce((accumulator, value) => accumulator + value, 0)

console.log(totals)
