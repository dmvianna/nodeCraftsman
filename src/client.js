'use strict'

const request = require('request')

request.get(
  'http://localhost:9999/getUserName?id=1234',
  (err, res, body) => {
    const result = JSON.parse(body)
    const name = result.value

    request.get(
      'http://localhost:9999/getUserStatus?id=1234',
      (err, res, body) => {
        const result = JSON.parse(body)
        const status = result.value

        console.log('The status of user', name, 'is', status)
      })
  })
