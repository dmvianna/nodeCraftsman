'use strict'

const greet = require('../src/greet')

describe('greet', () => {
  it('should greet the given name', () => {
    expect(greet('Joe')).toEqual('Hello Joe!')
  })

  it('should greet no-one special if no name is given', () => {
    expect(greet()).toEqual('Hello world!')
  })
})
