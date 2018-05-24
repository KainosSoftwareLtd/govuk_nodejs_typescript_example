// winston logger for adding logging statements

import * as winston  from 'winston'
import { get } from 'express-http-context'

const level = process.env.LOG_LEVEL || 'debug'

const winstonLogger = new (winston.Logger) ({
    transports: [
        new (winston.transports.Console)({
            timestamp: function() {
                return (new Date()).toISOString()
            },
            json: true,
            colorize: true,
            level: level,
        })
    ],
})

// (Optional) Wrap Winston logger to print UUID in each log
const formatMessage = function(message) {
    let reqId = get('reqId')
    message = reqId ? message + ' reqId: ' + reqId : message
    return message
}

const logger = {
    log: function(message) {
        winstonLogger.log(level, formatMessage(message))
    },
    error: function(message) {
        winstonLogger.error(formatMessage(message))
    },
    warn: function(message) {
        winstonLogger.warn(formatMessage(message))
    },
    verbose: function(message) {
        winstonLogger.verbose(formatMessage(message))
    },
    info: function(message) {
        winstonLogger.info(formatMessage(message))
    },
    debug: function(message) {
        winstonLogger.debug(formatMessage(message))
    },
    silly: function(message) {
        winstonLogger.silly(formatMessage(message))
    }
}

export { logger }
