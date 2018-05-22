import { transports }  from 'winston' // for transports.Console
import { logger, expressWinston, requestWhitelist } from 'express-winston'
import { get } from 'express-http-context'

const level = process.env.LOG_LEVEL || 'debug'

const expressLogger = new (logger)({
    transports: [
        new (transports.Console)({
            timestamp: function() {
                return (new Date()).toISOString()
            },
            json: true,
            colorize: true
        })
    ],
    msg: 'my custom message - write it here',
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
    msg: '{{err.message}}',
    level: function() {
      return 'warn'
    }
}

requestWhitelist.push('body') // whitelist the body of the request object

export { expressLogger, errorLoggerOptions }
