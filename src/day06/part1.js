const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const main = (data) => {
  const fishes = data[0].split(',').map((i) => parseInt(i, 10))
  const numberOfDays = 80
  const futureFishes = [...new Array(numberOfDays).keys()].reduce((acc) => {
    const numberOfNewFishes = acc.filter((f) => f === 0).length
    return [
      ...acc.map((f) => (f === 0 ? 6 : f - 1)),
      ...[...new Array(numberOfNewFishes).keys()].map(() => 8),
    ]
  }, fishes)
  return futureFishes.length
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
