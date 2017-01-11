'use strict'

const fs = require('fs')
const util = require('util')
const EventEmitter = require('events').EventEmitter

const FilesizeWatcher = function (path) {
  if (/^\//.test(path) === false) {
    process.nextTick(() => {
      this.emit('error', 'Path does not start with a slash')
    })
    return
  }

  fs.stat(path, (err, stats) => { this.lastfilesize = stats.size })

  this.interval = setInterval(() => {
    fs.stat(path, (err, stats) => {
      if (stats.size > this.lastfilesize) {
        this.emit('grew', stats.size - this.lastfilesize)
        this.lastfilesize = stats.size
      }
      if (stats.size < this.lastfilesize) {
        this.emit('shrank', this.lastfilesize - stats.size)
        this.lastfilesize = stats.size
      }
    }, 1000)
  })
}

util.inherits(FilesizeWatcher, EventEmitter)

FilesizeWatcher.prototype.stop = function () { clearInterval(this.interval) }

module.exports = FilesizeWatcher
