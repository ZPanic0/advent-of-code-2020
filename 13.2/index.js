const rectify = (input, offset) => {
    input = Number(input)

    let diff = input - offset

    while (diff < 0) {
        diff += input
    }

    return diff % input
}

const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')[1]
    .split(',')
    .map((input, offset) => input !== 'x' && [
        BigInt(input),
        BigInt(rectify(input, offset))
    ])
    .filter(input => input)
    .sort(([a], [b]) => b - a)

console.log(inputs)

let [step, time] = inputs[0]

for (let [value, offset] of inputs.slice(1)) {
    while (time % value !== offset) {
        time += step
    }

    step *= value
}

console.log(time)
