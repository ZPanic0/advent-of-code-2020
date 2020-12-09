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

const getVulnerableIndex = () => {
    for (let i = 0; i < inputs.length; i++) {
        const targetIndex = i + preambleLength

        if (!scan(i, targetIndex)) return targetIndex
    }
}

const getVulnerableRange = () => {
    const vulnerableIndex = getVulnerableIndex()
    const vulnerableValue = inputs[vulnerableIndex]

    for (let i = 0; i < inputs.length; i++) {
        let sum = inputs[i]
        for (let j = i + 1; j < inputs.length; j++) {
            const testedSet = [i]

            for (let k = j; k < inputs.length; k++) {
                sum += inputs[k]
                testedSet.push(k)

                if (sum === vulnerableValue) return testedSet
                if (sum > vulnerableValue) break
            }

            sum = inputs[i]
        }
    }

    return false
}

const results = getVulnerableRange()
const resultValues = results.map(value => inputs[value])

const min = Math.min(...resultValues)
const max = Math.max(...resultValues)

console.log(min + max)
