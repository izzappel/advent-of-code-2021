const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const main = (data) => {
  const fishes = data[0].split(',').map((i) => parseInt(i, 10))
  const numberOfDays = 256

  const summary = fishes.reduce(
    (acc, l) => ({
      ...acc,
      [l]: acc[l] + 1,
    }),
    {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
    }
  )

  const futureSummary = [...new Array(numberOfDays).keys()].reduce((acc) => {
    const numberOfNewFishes = acc[0]
    return {
      0: acc[1],
      1: acc[2],
      2: acc[3],
      3: acc[4],
      4: acc[5],
      5: acc[6],
      6: acc[7] + acc[0],
      7: acc[8],
      8: numberOfNewFishes,
    }
  }, summary)

  return Object.values(futureSummary).reduce((s, i) => s + i, 0)
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
