'use strict'

const fs = require('fs')

const FilesizeWatcher = (path) => {
  const self = this

  self.callbacks = {}

  if (/^\//.test(path) === false) {
    self.callbacks['error']('Path does not start with a slash')
    return
  }

  fs.stat(path, (err, stats) => { self.lastfilesize = stats.size })

  self.interval = setInterval(() => {
    fs.stat(path, (err, stats) => {
      if (stats.size > self.lastfilesize) {
        self.callbacks['grew'](stats.size - self.lastfilesize)
        self.lastfilesize = stats.size
      }
      if (stats.size < self.lastfilesize) {
        self.callbacks['shrank'](self.lastfilesize - stats.size)
        self.lastfilesize = stats.size
      }
    }, 1000)
  })
}

FilesizeWatcher.prototype.on = (eventType, callback) => {
  this.callbacks[eventType] = callback
}

FilesizeWatcher.prototype.stop = () => {
  clearInterval(this.interval)
}
