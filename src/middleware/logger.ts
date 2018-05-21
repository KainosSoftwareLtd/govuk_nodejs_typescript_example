import * as winston  from 'winston'
import { json } from 'body-parser'
import { stream } from 'morgan'


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

export { winstonLogger}
