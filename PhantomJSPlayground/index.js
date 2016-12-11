
var path = require('path')
var childProcess = require('child_process')
var phantomjs = require('phantomjs')
var binPath = phantomjs.path

console.log('Phantom BIN PATH = ', binPath)

var childArgs = [
  path.join(__dirname, 'github.js')
]

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  // handle result
  console.log('DONE DEAL')
})
