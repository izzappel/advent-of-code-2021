const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const maxValue = (values) => values.reduce((max, d) => Math.max(max, d), 0)
const minValue = (values) =>
  values.reduce((min, d) => Math.min(min, d), Number.MAX_SAFE_INTEGER)

const sum = (values) => values.reduce((acc, value) => acc + value, 0)

const calcFuelConsumption = (from, to) => {
  const distance = Math.abs(from - to)
  return sum([...new Array(distance).keys()]) + distance
}

const main = (data) => {
  const positions = data[0].split(',').map((d) => parseInt(d, 10))
  const maxPosition = maxValue(positions)
  const minPosition = minValue(positions)

  const possiblePositions = [
    ...new Array(maxPosition - minPosition + 1).keys(),
  ].map((i) => i + minPosition)

  const neededFuels = possiblePositions.map((p) =>
    positions.reduce((acc, d) => acc + calcFuelConsumption(d, p), 0)
  )
  return minValue(neededFuels)
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
