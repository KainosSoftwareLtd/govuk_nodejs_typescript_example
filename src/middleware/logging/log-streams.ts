const PrettyStream = require('bunyan-prettystream')

module.exports.consoleStream = function () {
    var prettyStream = new PrettyStream()
    prettyStream.pipe(process.stdout)
  
    return {
      level: 'DEBUG',
      stream: prettyStream
    }
  }