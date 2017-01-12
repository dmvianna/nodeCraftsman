'use strict'

const Pool = require('pg-pool')
const config = {
  database: 'tis',
  max: 10,
  idleTimeoutMillis: 30000
}

const pool = new Pool(config)

pool.connect(err => {
  if (err) throw err
})

pool.query(
  'SELECT * FROM area LIMIT 2',
  (err, result) => {
    if (err) throw err
    console.log(result.rows[0])
    pool.end(err => { if (err) throw err })
  })

pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack)
})
