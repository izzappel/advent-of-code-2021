const part1 = require('./part1')
const part2 = require('./part2')

describe('day02', () => {
  describe('part1', () => {
    test('should handle test input', async () => {
      const data = await part1.getTestInput()
      const result = part1.main(data)
      expect(result).toEqual(150)
    })

    test('should handle real input', async () => {
      const data = await part1.getInput()
      const result = part1.main(data)
      expect(result).toEqual(1670340)
    })
  })

  describe('part2', () => {
    test('should handle test input', async () => {
      const data = await part2.getTestInput()
      const result = part2.main(data)
      expect(result).toEqual(900)
    })

    test('should handle real input', async () => {
      const data = await part2.getInput()
      const result = part2.main(data)
      expect(result).toEqual(1954293920)
    })
  })
})
