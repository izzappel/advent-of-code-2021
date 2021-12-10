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

const sort = (txt = '') => txt.split('').sort().join('')

const isOne = (val) => val.length === 2
const isFour = (val) => val.length === 4
const isSeven = (val) => val.length === 3
const isEight = (val) => val.length === 7

const isThree = (val, one) =>
  val.length === 5 && val.includes(one[0]) && val.includes(one[1])

const isNine = (val, cf, d) =>
  val.length === 6 &&
  val.includes(cf[0]) &&
  val.includes(cf[1]) &&
  val.includes(d)
const isZero = (val, d) => val.length === 6 && !val.includes(d)
const isSix = (val, be, d) =>
  val.length === 6 &&
  val.includes(be[0]) &&
  val.includes(be[1]) &&
  val.includes(d)

const isFive = (val, f, c) =>
  val.length === 5 && val.includes(f) && !val.includes(c)
const isTwo = (val, c, f) =>
  val.length === 5 && val.includes(c) && !val.includes(f)

/**
 *
 *  aaaa
 * b    c
 * b    c
 *  dddd
 * e    f
 * e    f
 *  gggg
 */
const decode = (entry) => {
  const seven = sort(entry.signalPatterns.find(isSeven))
  const one = sort(entry.signalPatterns.find(isOne))
  const four = sort(entry.signalPatterns.find(isFour))
  const eight = sort(entry.signalPatterns.find(isEight))

  const three = sort(entry.signalPatterns.find((s) => isThree(s, one)))

  const a = seven.split('').find((char) => !one.includes(char))
  const cf = one
  const be = eight
    .split('')
    .filter((char) => !three.includes(char))
    .join('')
  const d = four
    .split('')
    .find((char) => char !== one[0] && char !== one[1] && three.includes(char))

  const zero = sort(entry.signalPatterns.find((s) => isZero(s, d)))
  const nine = sort(entry.signalPatterns.find((s) => isNine(s, cf, d)))
  const six = sort(entry.signalPatterns.find((s) => isSix(s, be, d)))

  const c = one.split('').find((char) => !six.includes(char))
  const f = one.split('').find((char) => char !== c)

  const five = sort(entry.signalPatterns.find((s) => isFive(s, f, c)))
  const two = sort(entry.signalPatterns.find((s) => isTwo(s, c, f)))

  const digitMap = {
    [zero]: 0,
    [one]: 1,
    [two]: 2,
    [three]: 3,
    [four]: 4,
    [five]: 5,
    [six]: 6,
    [seven]: 7,
    [eight]: 8,
    [nine]: 9,
  }

  const output = parseInt(
    entry.outputValues.map((v) => digitMap[sort(v)]).join(''),
    10
  )
  return output
}

const main = (data) => {
  const entries = data.map(parseLine)

  return entries.map(decode).reduce((acc, output) => acc + output, 0)
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
