let lastNumber

const call = (inputs, number, index) => {
    switch (inputs[number]?.lastCalled.length) {
        case undefined:
            inputs[number] = { lastCalled: [index + 1] }
            break
        case 1:
            inputs[number].lastCalled.push(index + 1)
            break
        case 2:
            inputs[number].lastCalled[0] = inputs[number].lastCalled[1]
            inputs[number].lastCalled[1] = index + 1
            break
    }

    lastNumber = number

    return inputs
}

const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split(',')
    .reduce(call, {})

for (let turn = Object.keys(inputs).length; turn < 2020; turn++) {
    switch (inputs[lastNumber].lastCalled.length) {
        case 1:
            call(inputs, 0, turn)
            break

        case 2:
            call(
                inputs,
                inputs[lastNumber].lastCalled[1] - inputs[lastNumber].lastCalled[0],
                turn
            )
            break
    }
}

console.log(lastNumber)