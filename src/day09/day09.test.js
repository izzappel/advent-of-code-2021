const part1 = require('./part1')
const part2 = require('./part2')

describe('dayxx', () => {
  describe('part1', () => {
    test('should handle test input', async () => {
      const data = await part1.getTestInput()
      const result = part1.main(data)
      expect(result).toEqual(15)
    })

    test('should handle real input', async () => {
      const data = await part1.getInput()
      const result = part1.main(data)
      expect(result).toEqual(508)
    })
  })

  describe('part2', () => {
    test('should handle test input', async () => {
      const data = await part2.getTestInput()
      const result = part2.main(data)
      expect(result).toEqual(1134)
    })

    test('should handle real input', async () => {
      const data = await part2.getInput()
      const result = part2.main(data)
      expect(result).toEqual(1564640)
    })
  })
})
