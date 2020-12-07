const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')

const fetchKeyRegex = /(^[a-z 0]*) bags/

let resultBags = ['shiny gold']

let lastRun

while (resultBags.length !== lastRun) {
    lastRun = resultBags.length
    const matches = inputs
        .filter(input => resultBags
            .some(bag => input.includes(bag)))

    resultBags = matches.map(match => match.match(fetchKeyRegex)[1])
}

//Subtracting 1 as the bag cannot hold itself, but is present in result set
console.log(resultBags.length - 1)