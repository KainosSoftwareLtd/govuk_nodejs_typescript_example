// winston middleware (request and error logging) for express.js

import { transports }  from 'winston' // for transports.Console
import { logger, requestWhitelist, bodyBlacklist } from 'express-winston'
import { get } from 'express-http-context'

const level = process.env.LOG_LEVEL || 'debug'

const expressLogger = new (logger)({
    transports: [
        new (transports.Console)({
            timestamp: function() {
                return (new Date()).toISOString()
            },
            json: true,
            colorize: true,
            level: level,
        })
    ],
    msg: 'HTTP {{req.method}} {{req.url}}',
    meta: true,
    dynamicMeta: function(req, res) {
        return {
          reqId: get('reqId'),
          appName: get('appName')
      }
    }
})

const errorLoggerOptions = {
    transports: [
        new transports.Console({
            json: true
        }),
    ],
    msg: '{{ err.message }}',
    level: function() {
      return 'error'
    }
}

requestWhitelist.push('body') // whitelist the body of the request object
bodyBlacklist.push('_csrf') // remove cserf token from the body of any form

export { expressLogger, errorLoggerOptions }
