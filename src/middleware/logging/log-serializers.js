var _ = require('lodash')

module.exports.requestSerializer = function (request) {
    return {
      url: request.url,
      method: request.method,
      params: request.params,
      clientAddress: request.connection.remoteAddress
    }
  }
  
  module.exports.responseSerializer = function (response) {
    return {
      statusCode: response.statusCode,
      responseTime: response.get('X-Response-Time')
    }
  }
  
  module.exports.errorSerializer = function (error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack
    }
  }

  module.exports.bodySerializer = function (body){
    return _.omit(body, ['dobDay', 'dobMonth', 'dobYear', '_csrf'])
  
  }