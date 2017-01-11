'use strict'

const http = require('http')
const url = require('url')
const querystring = require('querystring')

http.createServer((request, response) => {
  const pathname = url.parse(request.url).pathname
  const query = url.parse(request.url).query
  const id = querystring.parse(query)['id']

  const result = {
    'pathname': pathname,
    'id': id,
    'value': Math.floor(Math.random() * 100)
  }

  setTimeout(() => {
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify(result))
  }, 2000 + Math.floor(Math.random() * 1000))
}).listen(
  9999,
  () => console.log('Echo Server listening on port 9999')
)
