const inputs = require('fs')
    .readFileSync('./input.txt')
    .toString()
    .split('\n')
    .map(Number)

const preambleLength = 25

const scan = (startIndex, targetIndex) => {
    const target = inputs[targetIndex]
    const scanSet = inputs.slice(startIndex, targetIndex)

    for (let i = 0; i < scanSet.length; i++) {
        for (let j = i + 1; j < scanSet.length; j++) {
            const sum = scanSet[i] + scanSet[j]

            if (sum === target) return true
        }
    }

    return false
}

for (let i = 0; i < inputs.length; i++) {
    if (!scan(i, i + preambleLength)) {
        console.log(inputs[i + preambleLength])
        break
    }
}
