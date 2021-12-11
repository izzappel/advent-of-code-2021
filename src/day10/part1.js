const _ = require('lodash')
const { readInput } = require('../file')

const getTestInput = () => readInput(`${__dirname}/test-input.txt`)

const getInput = () => readInput(`${__dirname}/input.txt`)

class SyntaxError extends Error {
  constructor(char, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SyntaxError)
    }

    this.char = char
  }
}

const brackets = [
  { open: '(', close: ')' },
  { open: '[', close: ']' },
  { open: '{', close: '}' },
  { open: '<', close: '>' },
]

const errorScores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const isOpen = (char) => brackets.some(({ open }) => open === char)
const isClose = (char) => brackets.some(({ close }) => close === char)
const isMatching = (o, c) =>
  brackets.some(({ open, close }) => open === o && close === c)

const parse = (line) => {
  const tree = line.reduce(
    ({ tree, path }, char) => {
      const current = _.get(tree, path)

      if (isOpen(char)) {
        const node = {
          char,
          parentPath: path,
          children: [],
        }

        return {
          tree: _.update(tree, path, (obj) => ({
            ...obj,
            children: [...obj.children, node],
          })),
          path: [...path, 'children', current.children.length],
        }
      }

      if (isMatching(current.char, char)) {
        return {
          tree: _.update(tree, path, (obj) => ({
            ...obj,
            closed: true,
          })),
          path: path.slice(0, -2),
        }
      }

      throw new SyntaxError(char)
    },
    { tree: { root: { children: [] } }, path: ['root'] }
  )
  return tree
}

const getCorruptedChar = (line) => {
  try {
    parse(line)
  } catch (error) {
    return error.char
  }

  return null
}

const main = (data) => {
  const lines = data.map((d) => d.split(''))
  const errorChars = lines.map(getCorruptedChar).filter(Boolean)

  return errorChars.reduce((sum, char) => sum + errorScores[char], 0)
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
