const fs = require('fs')

const readInput = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }

      const lines = data.toString().split('\n').filter(d => d)
      resolve(lines)
    })
  })
}

module.exports = { readInput }
