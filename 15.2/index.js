let lastNumber

const call = (map, number, index) => {
    const calls = map.get(number)

    switch (calls?.length) {
        case undefined:
            map.set(number, [index])
            break
        case 1:
            calls.push(index)
            break
        case 2:
            calls[0] = calls[1]
            calls[1] = index
            break
    }

    lastNumber = number

    return map
}

const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split(',')
    .map(Number)
    
const map = inputs.reduce(call, new Map())

for (let turn = inputs.length; turn < 30000000; turn++) {
    const lastNumberCalls = map.get(lastNumber)

    call(
        map,
        lastNumberCalls.length === 1 ? 0 : lastNumberCalls[1] - lastNumberCalls[0],
        turn
    )
}

console.log(lastNumber)