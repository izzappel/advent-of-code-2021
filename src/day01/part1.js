const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getDifference = (prev, acutal) => {
  if (prev === null) {
    return null
  }
  return parseInt(prev) >= parseInt(acutal) ? 'decreased' : 'increased'
}

const main = (data) => {
  const preparedData = data.reduce((acc, depth) => {
    const prevDepth = acc.length > 0 ? acc[acc.length - 1].depth : null
    return [...acc, { depth, prevDepth, diff: getDifference(prevDepth, depth) }]
  }, [])

  return preparedData.map((d) => d.diff).filter((diff) => diff === 'increased')
    .length
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
