const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const invert = (binary) =>
  binary
    .split('')
    .map((bit) => (bit === '0' ? '1' : '0'))
    .join('')

const binToDec = (binary) => parseInt(binary, 2)

const filterByCriteria = (data, index, criteriaFn) => {
  const sum = data.reduce(
    (acc, binary) => {
      return {
        0: binary[index] === '0' ? (acc['0'] += 1) : acc['0'],
        1: binary[index] === '1' ? (acc['1'] += 1) : acc['1'],
      }
    },
    { 0: 0, 1: 0 }
  )

  const filterBit = criteriaFn(sum['0'], sum['1'])
  const filteredData = data.filter((binary) => binary[index] === filterBit)

  if (filteredData.length === 1) {
    return filteredData
  }

  return filterByCriteria(filteredData, index + 1, criteriaFn)
}

const main = (data) => {
  const oxygenGeneratorRateBinary = filterByCriteria(data, 0, (sum0, sum1) => sum0 > sum1 ? '0' : '1')
  const c02ScrubberRateBinary = filterByCriteria(data, 0, (sum0, sum1) => sum0 <= sum1 ? '0' : '1')

  const oxygenGeneratorRateDec = binToDec(oxygenGeneratorRateBinary)
  const c02ScrubberRateDec = binToDec(c02ScrubberRateBinary)

  return oxygenGeneratorRateDec * c02ScrubberRateDec
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
