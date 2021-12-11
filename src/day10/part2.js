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

const scores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const isOpen = (char) => brackets.some(({ open }) => open === char)
const getClosing = (char) => brackets.find(({ open }) => open === char)?.close
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
  return tree.tree
}

const getCompletionString = (tree, s = '') => {
  const completionString = tree.children.reduce((s, node) => {
    const hasChildren = node.children.length !== 0

    return `${s}${hasChildren ? getCompletionString(node, s) : ''}${
      !node.closed ? getClosing(node.char) : ''
    }`
  }, s)

  return completionString
}

const isCorrupt = (line) => {
  try {
    parse(line)
  } catch (error) {
    return true
  }

  return false
}

const calculateScore = (completions) =>
  completions.split('').reduce((s, c) => s * 5 + scores[c], 0)

const main = (data) => {
  const incompleteLines = data
    .map((d) => d.split(''))
    .filter((d) => !isCorrupt(d))

  const trees = incompleteLines.map(parse)

  const completions = trees.map(({ root }) => getCompletionString(root))

  const scoreValues = completions.map(calculateScore).sort((a, b) => a - b)

  return scoreValues[(scoreValues.length - 1) / 2]
}

module.exports = {
  getInput,
  getTestInput,
  main,
}
