'use strict'

const fs = require('fs')

const FilesizeWatcher = function (path) {
  this.callbacks = {}

  if (/^\//.test(path) === false) {
    process.nextTick(() => {
      this.callbacks['error']('Path does not start with a slash')
    })
    return
  }

  fs.stat(path, (err, stats) => { this.lastfilesize = stats.size })

  this.interval = setInterval(() => {
    fs.stat(path, (err, stats) => {
      if (stats.size > this.lastfilesize) {
        this.callbacks['grew'](stats.size - this.lastfilesize)
        this.lastfilesize = stats.size
      }
      if (stats.size < this.lastfilesize) {
        this.callbacks['shrank'](this.lastfilesize - stats.size)
        this.lastfilesize = stats.size
      }
    }, 1000)
  })
}

FilesizeWatcher.prototype.on = function (eventType, callback) {
  this.callbacks[eventType] = callback
}

FilesizeWatcher.prototype.stop = function () {
  clearInterval(this.interval)
}

module.exports = FilesizeWatcher
