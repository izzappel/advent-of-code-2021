const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const parseLine = (line) => {
  const [signalPatterns, outputValues] = line.split(' | ')

  return {
    signalPatterns: signalPatterns.split(' '),
    outputValues: outputValues.split(' '),
  }
}

const isOne = (val) => val.length === 2
const isFour = (val) => val.length === 4
const isSeven = (val) => val.length === 3
const isEight = (val) => val.length === 7

const main = (data) => {
  const entries = data.map(parseLine)

  return entries
    .map((e) => e.outputValues)
    .flat()
    .filter((e) => isOne(e) || isFour(e) || isSeven(e) || isEight(e))
    .length
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
