const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const main = (data) => {
  const heightmap = data.map((l) => l.split(''))

  const numberOfLines = heightmap.length
  const numberOfRows = heightmap[0].length

  const lowpoints = heightmap.reduce((acc, line, y) => {
    const points = line.reduce((acc, point, x) => {
      const top = y > 0 ? heightmap[y - 1][x] : Number.MAX_SAFE_INTEGER
      const bottom = y + 1 < numberOfLines ? heightmap[y  + 1][x] : Number.MAX_SAFE_INTEGER
      const left = x > 0 ? heightmap[y][x - 1] : Number.MAX_SAFE_INTEGER
      const right = x + 1 < numberOfRows ? heightmap[y][x + 1] : Number.MAX_SAFE_INTEGER

      const isLowpoint = point < top && point < bottom && point < left && point < right
      return [
        ...acc,
        ...(isLowpoint ? [point] : [])
      ]
    }, [])
    return [
      ...acc,
      ...points,
    ]
  }, [])

  return lowpoints.map(p => parseInt(p, 10) + 1).reduce((sum, p) => sum + p)
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
