import { transports }  from 'winston' // for transports.Console
import { logger, expressWinston, requestWhitelist } from 'express-winston'
import { get } from 'express-http-context'

// Wrap Winston logger to print reqId in each log
const formatMessage = function() {
    let reqId = get('reqId')
    return reqId
}

const expressLogger = new (logger)({
    transports: [
        new (transports.Console)({
            timestamp: function() {
                return (new Date()).toISOString()
            },
            json: true,
            colorize: true,
        })
    ],
    msg: 'my custom message: ',
})

requestWhitelist.push('body') // whitelist the body of the request object
requestWhitelist.push('reqId')

export { expressLogger }
