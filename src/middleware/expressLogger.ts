import * as winston  from 'winston' // for transports.Console
import * as expressWinston from 'express-winston'

const expressLogger = new (expressWinston.logger)({
    transports: [
        new (winston.transports.Console)({
            timestamp: function() {
                return (new Date()).toISOString()
            },
            json: true,
            colorize: true
        })
    ]
})

export { expressLogger }
