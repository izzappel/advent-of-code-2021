const part1 = require('./part1')
const part2 = require('./part2')

describe('day06', () => {
  describe('part1', () => {
    test('should handle test input', async () => {
      const data = await part1.getTestInput()
      const result = part1.main(data)
      expect(result).toEqual(5934)
    })

    test('should handle real input', async () => {
      const data = await part1.getInput()
      const result = part1.main(data)
      expect(result).toEqual(353079)
    })
  })

  describe('part2', () => {
    test('should handle test input', async () => {
      const data = await part2.getTestInput()
      const result = part2.main(data)
      expect(result).toEqual(26984457539)
    })

    test('should handle real input', async () => {
      const data = await part2.getInput()
      const result = part2.main(data)
      expect(result).toEqual(1605400130036)
    })
  })
})
