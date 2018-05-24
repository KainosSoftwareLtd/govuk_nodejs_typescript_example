import * as winston  from 'winston'
import { json } from 'body-parser'
import { get } from 'express-http-context'
import { Stream } from 'stream'

const level = process.env.LOG_LEVEL || 'debug'

// tslint:disable-next-line:no-console
console.log('inside logger.ts')

const winstonLogger = new (winston.Logger) ({
    transports: [
        new (winston.transports.Console)({
            timestamp: function() {
                return (new Date()).toISOString()
            }
        })
    ]
})

// Wrap Winston logger to print reqId in each log
const formatMessage = function(message) {
    let reqId = get('reqId')
    let appName = get('appName')
    message = reqId ? message + ' reqId: ' + reqId + ' '  + appName : message
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

export { logger, winstonLogger }
