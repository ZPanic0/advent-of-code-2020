
const fetchKeyRegex = /^([a-z ]*) bags contain/
const fetchValuesRegex = / ([0-9]*) ([a-z ]*) bag/g
const splitValuesRegex = / ([0-9]*) ([a-z ]*) bag/

const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .reduce((accumulator, input) => {
        const [, name] = input.match(fetchKeyRegex)
        const values = input.match(fetchValuesRegex)

        accumulator[name] = (values || []).map(result => {
            const [, count, name] = result.match(splitValuesRegex)

            return { name, count: Number(count) }
        })

        return accumulator
    }, {})

const recurse = input => input.length
    ? input.reduce((accumulator, thisBag) => accumulator + (thisBag.count * (1 + recurse(inputs[thisBag.name]))), 0)
    : 0

console.log(recurse(inputs['shiny gold']))