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
      statusCode: response.statusCode
    }
  }
  
  module.exports.errorSerializer = function (error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack
    }
  }