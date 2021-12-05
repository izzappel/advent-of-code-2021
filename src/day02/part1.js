const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const Direction = {
  forward: 'forward',
  down: 'down',
  up: 'up',
}

const extractStep = (step) => {
  const extracted = step.split(' ')
  return { direction: extracted[0], amount: parseInt(extracted[1]) }
}

const main = (data) => {
  const result = data.reduce(
    (acc, step) => {
      const { direction, amount } = extractStep(step)
      if (direction === Direction.forward) {
        return { ...acc, x: acc.x + amount }
      }

      return {
        ...acc,
        y: direction === Direction.down ? acc.y + amount : acc.y - amount,
      }
    },
    { x: 0, y: 0 }
  )

  return result.x * result.y
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
