const _ = require('lodash')
const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const printGrid = (grid) => {
  console.log(grid.map((line) => line.join(' ')))
}

const getAdjacentCells = (grid, y, x) => {
  const yMAx = grid.length - 1
  const xMax = grid[0].length - 1

  const hasTop = y - 1 >= 0
  const hasBottom = y + 1 <= yMAx
  const hasLeft = x - 1 >= 0
  const hasRight = x + 1 <= xMax

  const topLeft = hasTop && hasLeft ? { y: y - 1, x: x - 1 } : null
  const top = hasTop ? { y: y - 1, x } : null
  const topRight = hasTop && hasRight ? { y: y - 1, x: x + 1 } : null
  const left = hasLeft ? { y, x: x - 1 } : null
  const right = hasRight ? { y, x: x + 1 } : null
  const bottomLeft = hasBottom && hasLeft ? { y: y + 1, x: x - 1 } : null
  const bottom = hasBottom ? { y: y + 1, x } : null
  const bottomRight = hasBottom && hasRight ? { y: y + 1, x: x + 1 } : null

  return [
    topLeft,
    top,
    topRight,
    left,
    right,
    bottomLeft,
    bottom,
    bottomRight,
  ].filter(Boolean)
}

const increaseAll = (grid) =>
  grid.reduce(
    (acc, y) => [...acc, y.reduce((acc, x) => [...acc, x + 1], [])],
    []
  )

const increase = (grid, points) => {
  return grid.reduce(
    (acc, line, y) => [
      ...acc,
      line.reduce(
        (acc, val, x) => [
          ...acc,
          points.some((p) => p.y === y && p.x == x) && val !== -1
            ? val + 1
            : val,
        ],
        []
      ),
    ],
    []
  )
}

const reset = (grid) =>
  grid.reduce(
    (acc, y) => [...acc, y.reduce((acc, x) => [...acc, x === -1 ? 0 : x], [])],
    []
  )

const markCellAsFlashed = (grid, y, x) =>
  _.update(grid, `[${y}][${x}]`, () => -1)

const flash = (grid, y, x) => {
  const adjacents = getAdjacentCells(grid, y, x)
  const canFlash = grid[y][x] > 9

  const flashedGrid = increase(markCellAsFlashed(grid, y, x), adjacents)

  return canFlash
    ? {
        grid: flashedGrid,
        hasFlashed: true,
      }
    : { grid, hasFlashed: false }
}

const getFlashableCells = (grid) =>
  grid.reduce(
    (acc, line, y) => [
      ...acc,
      ...line.reduce(
        (acc, val, x) => [...acc, ...(val > 9 ? [{ y, x }] : [])],
        []
      ),
    ],
    []
  )

const flashRecursive = (grid, numberOfPrevFlashes = 0) => {
  const flashes = getFlashableCells(grid)
  if (flashes.length === 0) {
    return { grid, numberOfFlashes: numberOfPrevFlashes }
  }

  const { grid: flashedGrid, numberOfFlashes } = flashes.reduce(
    (acc, point) => {
      const result = flash(acc.grid, point.y, point.x)
      return {
        grid: result.grid,
        numberOfFlashes: result.hasFlashed
          ? acc.numberOfFlashes + 1
          : acc.numberOfFlashes,
      }
    },
    { grid, numberOfFlashes: numberOfPrevFlashes }
  )
  return flashRecursive(flashedGrid, numberOfFlashes)
}

const step = (grid) => {
  const increasedGrid = increaseAll(grid)
  const { grid: updatedGrid, numberOfFlashes } = flashRecursive(increasedGrid)
  return { grid: reset(updatedGrid), numberOfFlashes }
}

const main = (data) => {
  const grid = data.map((d) => d.split('').map((d) => parseInt(d, 10)))

  const numberOfElements = grid.length * grid[0].length
  let numberOfFlashes = 0
  let nextGrid = grid
  let stepNumber = 0
  while (numberOfFlashes !== numberOfElements) {
    stepNumber++
    const result = step(nextGrid)
    numberOfFlashes = result.numberOfFlashes
    nextGrid = result.grid
  }

  return stepNumber
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
