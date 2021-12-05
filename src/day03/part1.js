const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const invert = (binary) =>
  binary
    .split('')
    .map((bit) => (bit === '0' ? '1' : '0'))
    .join('')

const binToDec = (binary) => parseInt(binary, 2)

const main = (data) => {
  const numberOfBits = data[0].length

  const gammaRateBinary = [...Array(numberOfBits).keys()]
    .map((index) => {
      const sum = data.reduce(
        (acc, binary) => {
          return {
            0: binary[index] === '0' ? (acc['0'] += 1) : acc['0'],
            1: binary[index] === '1' ? (acc['1'] += 1) : acc['1'],
          }
        },
        { 0: 0, 1: 0 }
      )

      return sum['0'] > sum['1'] ? '0' : '1'
    })
    .join('')
  const epsilonRateBinary = invert(gammaRateBinary)

  const gammaRateDec = binToDec(gammaRateBinary)
  const epsilonRateDec = binToDec(epsilonRateBinary)

  return gammaRateDec * epsilonRateDec
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
