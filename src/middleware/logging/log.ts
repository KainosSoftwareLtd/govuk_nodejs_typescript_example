const bunyan = require('bunyan')
const serializers = require('./log-serializers')

var log = bunyan.createLogger({
  name: 'application-logger',
  serializers: {
    'request': serializers.requestSerializer,
    'response': serializers.responseSerializer,
    'error': serializers.errorSerializer
  }
})

module.exports = log