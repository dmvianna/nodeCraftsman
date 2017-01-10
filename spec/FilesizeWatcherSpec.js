'use strict'

const FilesizeWatcher = require('../src/FilesizeWatcher')

const exec = require('child_process').exec

describe('FilesizeWatcher', () => {

  let watcher
  afterEach(() => watcher.stop())

  it('should fire a "grew" event when the file grew in size', (done) => {
    const path = '/var/tmp/filesizewatcher.test'
    exec('rm -f ' + path + ' ; touch ' + path, () => {
      watcher = new FilesizeWatcher(path)

      watcher.on('grew', (gain) => {
        expect(gain).toBe(5)
        done()
      })
      exec('echo "test" > ' + path, () => {})
    })
  })

    it('should fire a "shrank" event when the file grew in size', (done) => {
      const path = '/var/tmp/filesizewatcher.test'
      exec('rm -f ' + path + ' ; echo "test" > ' + path, () => {
        watcher = new FilesizeWatcher(path)

        watcher.on('shrank', (loss) => {
          expect(loss).toBe(3)
          done()
        })
        exec('echo "a" > ' + path, () => {})
      })
    })

  it('should fire "error" if path does not start with a slash', (done) => {
    const path = 'var/tmp/filesizewatcher.test'
    watcher = new FilesizeWatcher(path)

    watcher.on('error', (err) => {
      expect(err).toBe('Path does not start with a slash')
      done()
    })
  })
})
