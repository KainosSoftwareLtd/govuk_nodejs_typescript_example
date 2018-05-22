const bunyan = require('bunyan')
const serializers = require('./log-serializers')
const streams = require('./log-streams')

var log = bunyan.createLogger({
  name: 'application-logger',
  streams: [streams.consoleStream()],
  serializers: {
    'request': serializers.requestSerializer,
    'response': serializers.responseSerializer,
    'error': serializers.errorSerializer
  }
})

module.exports = log