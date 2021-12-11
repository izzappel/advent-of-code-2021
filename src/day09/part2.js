const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

const getLowpoints = (heightmap) => {
  const numberOfLines = heightmap.length
  const numberOfRows = heightmap[0].length

  const lowpoints = heightmap.reduce((acc, line, y) => {
    const points = line.reduce((acc, point, x) => {
      const top = y > 0 ? heightmap[y - 1][x] : Number.MAX_SAFE_INTEGER
      const bottom =
        y + 1 < numberOfLines ? heightmap[y + 1][x] : Number.MAX_SAFE_INTEGER
      const left = x > 0 ? heightmap[y][x - 1] : Number.MAX_SAFE_INTEGER
      const right =
        x + 1 < numberOfRows ? heightmap[y][x + 1] : Number.MAX_SAFE_INTEGER

      const isLowpoint =
        point < top && point < bottom && point < left && point < right
      return [...acc, ...(isLowpoint ? [{ y, x, point }] : [])]
    }, [])
    return [...acc, ...points]
  }, [])
  return lowpoints
}

const getAdjacentPoints = (x, y, heightmap) => {
  const numberOfLines = heightmap.length
  const numberOfRows = heightmap[0].length

  const top = y > 0 ? { y: y - 1, x, point: heightmap[y - 1][x] } : null
  const bottom =
    y + 1 < numberOfLines ? { y: y + 1, x, point: heightmap[y + 1][x] } : null
  const left = x > 0 ? { y, x: x - 1, point: heightmap[y][x - 1] } : null
  const right =
    x + 1 < numberOfRows ? { y, x: x + 1, point: heightmap[y][x + 1] } : null

  return [top, bottom, left, right].filter(Boolean)
}

const getBasin = (x, y, heightmap, basin) => {
  const points = getAdjacentPoints(x, y, heightmap)
    .filter(({ point }) => point < 9)
    .filter(({ x, y }) => !basin.some((p) => p.x === x && p.y === y))

  const updatedBasing = points.reduce(
    (acc, { x, y }) => getBasin(x, y, heightmap, acc),
    [...basin, ...points]
  )

  return updatedBasing
}

const main = (data) => {
  const heightmap = data.map((l) => l.split('').map((p) => parseInt(p, 10)))
  const lowpoints = getLowpoints(heightmap)

  const basins = lowpoints
    .map((p) => getBasin(p.x, p.y, heightmap, [p]).length)
    .sort((a, b) => b - a)

  return basins[0] * basins[1] * basins[2]
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
