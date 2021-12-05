const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const extractCoordinates = (line) => {
  const splitted = line
    .split(' -> ')
    .map((n) => n.split(','))
    .map((n) => ({
      x: parseInt(n[0], 10),
      y: parseInt(n[1], 10),
    }))
  const start = splitted[0]
  const end = splitted[1]

  return {
    start,
    end,
  }
}

const add = (a, b) => a + b
const sub = (a, b) => b - a
const eq = (a, b) => b

const createPoints = (numberOfPoints, start, end) => {
  const fn = start == end ? eq : start > end ? sub : add
  const points = Array.from({ length: numberOfPoints }, (_, i) => fn(i, start))
  return points
}

const getLinePoints = (line) => {
  const numberOfXPoints = Math.abs(line.end.x - line.start.x) + 1
  const numberOfYPoints = Math.abs(line.end.y - line.start.y) + 1
  const numberOfPoints = Math.max(numberOfXPoints, numberOfYPoints)
  const xPoints = createPoints(numberOfPoints, line.start.x, line.end.x)
  const yPoints = createPoints(numberOfPoints, line.start.y, line.end.y)

  const linePoints = xPoints.map((x, index) => ({ x: x, y: yPoints[index] }))
  return linePoints
}

const main = (data) => {
  const lines = data.map(extractCoordinates)

  /**
   * {'0:0': 1, '1:2': 1}
   */
  const map = lines.reduce((acc, line) => {
    const points = getLinePoints(line)
    return {
      ...acc,
      ...points.reduce((sum, point) => {
        const key = `${point.x}:${point.y}`
        return {
          ...sum,
          [key]: (acc[key] || 0) + 1,
        }
      }, {}),
    }
  }, {})

  const dangerousPoints = Object.values(map).filter((n) => n > 1).length
  return dangerousPoints
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
