const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getStartCoordinates = (a, b) => {
  if (a.x !== b.x && a.y !== b.y) {
    return a
  }

  if (a.x === b.x) {
    const startY = Math.min(a.y, b.y)
    return { x: a.x, y: startY }
  }

  const startX = Math.min(a.x, b.x)
  return { x: startX, y: a.y }
}

const getEndCoordinates = (a, b) => {
  if (a.x !== b.x && a.y !== b.y) {
    return b
  }

  if (a.x === b.x) {
    const endY = Math.max(a.y, b.y)
    return { x: a.x, y: endY }
  }

  const endX = Math.max(a.x, b.x)
  return { x: endX, y: a.y }
}

const extractCoordinates = (line) => {
  const splitted = line
    .split(' -> ')
    .map((n) => n.split(','))
    .map((n) => ({
      x: parseInt(n[0], 10),
      y: parseInt(n[1], 10),
    }))
  const a = splitted[0]
  const b = splitted[1]

  return {
    start: getStartCoordinates(a, b),
    end: getEndCoordinates(a, b),
  }
}

const getLinePoints = (line) => {
  if (line.start.x === line.end.x) {
    const numberOfPoints = line.end.y - line.start.y + 1
    const points = Array.from(
      { length: numberOfPoints },
      (_, i) => i + line.start.y
    )
    return points.map((p) => ({ x: line.start.x, y: p }))
  }

  const numberOfPoints = line.end.x - line.start.x + 1
  const points = Array.from(
    { length: numberOfPoints },
    (_, i) => i + line.start.x
  )
  return points.map((p) => ({ x: p, y: line.start.y }))
}

const isStraightLine = (line) =>
  line.start.x === line.end.x || line.start.y === line.end.y

const main = (data) => {
  const lines = data.map(extractCoordinates).filter(isStraightLine)

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
