'use strict'

const request = require('request')
const async = require('async')

const getUsername = callback => request.get(
  'http://localhost:9999/getUserName?id=1234',
  (err, res, body) => {
    const result = JSON.parse(body)
    callback(err, result.value)
  })

const getUserStatus = callback => request.get(
  'http://localhost:9999/getUserStatus?id=1234',
  (err, res, body) => {
    const result = JSON.parse(body)
    callback(err, result.value)
  })

async.parallel([getUsername, getUserStatus], (err, results) => {
  console.log('The status of user', results[0], 'is', results[1])
})
