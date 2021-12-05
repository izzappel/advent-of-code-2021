const { readInput } = require('../file')

const getTestInput = () =>
  readInput(`${__dirname}/test-input.txt`, { keepEmptyLines: true })

const getInput = () =>
  readInput(`${__dirname}/input.txt`, { keepEmptyLines: true })

const extractBoards = (data) =>
  data.reduce(
    (acc, line) => {
      if (!line) {
        return [...acc, []]
      }

      const currentBoard = acc[acc.length - 1]
      return [...acc.slice(0, -1), [...currentBoard, line]]
    },
    [[]]
  )

const initalizeBoard = (board) =>
  board.map((line) =>
    line
      .split(' ')
      .filter(Boolean)
      .map((n) => ({
        nr: parseInt(n, 10),
        marked: false,
      }))
  )

const markNumbers = (nr, board) =>
  board.map((line) =>
    line.map((n) => (n.nr === nr ? { ...n, marked: true } : n))
  )

const transposeBoard = (board) =>
  board.reduce(
    (prev, next) => next.map((item, i) => (prev[i] || []).concat(next[i])),
    []
  )

const calculateScore = (board) =>
  board.reduce(
    (acc, line) =>
      acc +
      line.filter((n) => n.marked == false).reduce((sum, n) => sum + n.nr, 0),
    0
  )

const detectBingo = (board) => {
  const hasRow = board.some((line) => line.every((n) => n.marked))
  const hasColumn = transposeBoard(board).some((line) =>
    line.every((n) => n.marked)
  )

  return hasRow || hasColumn
}

const printBoard = (board) => {
  console.log(
    board.map((line) =>
      line.map((l) => `${l.nr} (${l.marked ? '✅' : '❌'})`).join(' ')
    )
  )
}

const playBingo = (numbers, boards, index) => {
  if (index > numbers.length) {
    return null
  }

  const currentNumber = numbers[index]

  const markedBoards = boards.map((board) => markNumbers(currentNumber, board))

  const detectedBoards = markedBoards.filter(detectBingo)
  if (detectedBoards.length > 0) {
    return { currentNumber, winningBoard: detectedBoards[0] }
  }

  return playBingo(numbers, markedBoards, index + 1)
}

const main = (data) => {
  const drawNumbers = data[0].split(',').map((n) => parseInt(n, 10))

  const boards = extractBoards(data.slice(2)).map(initalizeBoard)
  const { currentNumber, winningBoard } = playBingo(drawNumbers, boards, 0)
  
  printBoard(winningBoard)
  const score = calculateScore(winningBoard)

  return score * currentNumber
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
