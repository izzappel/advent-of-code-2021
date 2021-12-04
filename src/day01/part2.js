const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getDifference = (prev, acutal) => {
  if (prev === null) {
    return null
  }
  if (prev === acutal) {
    return 'no change'
  }
  return prev >= acutal ? 'decreased' : 'increased'
}

const main = (data) => {
  const summedData = data
    .map((d) => parseInt(d))
    .reduce(
      (acc, depth) => {
        const { sum } = acc
        const consumed = [...acc.consumed, depth]
        if (consumed.length < 3) {
          return { consumed, sum }
        }

        return {
          consumed,
          sum: [...sum, consumed.slice(-3).reduce((s, e) => s + e)],
        }
      },
      { consumed: [], sum: [] }
    )

  const preparedData = summedData.sum.reduce((acc, depth) => {
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
