'use strict'

const greet = (name) => {
  if (name === undefined) {
    name = 'world'
  }
  return 'Hello ' + name + '!'
}

module.exports = greet
