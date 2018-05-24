const PrettyStream = require('bunyan-prettystream')

module.exports.consoleStream = function () {
    var prettyStream = new PrettyStream()
    prettyStream.pipe(process.stdout)
  
    return {
      level: (process.env.LOG_LEVEL || 'DEBUG'),
      stream: prettyStream
    }
  }