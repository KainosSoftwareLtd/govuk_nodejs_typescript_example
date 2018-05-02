import * as express from 'express'
import * as expressNunjucks from 'express-nunjucks'
import * as path from 'path'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as sassMiddleware from 'node-sass-middleware'

import { TYPES } from './types'
import { iocContainer } from './ioc'
import { IndexController } from './controllers/indexController'
import { attachErrorHandling } from './middleware/errorHandling'

const app = express()
const isDev = app.get('env') === 'development'

// view engine setup
app.set('views', path.join(__dirname, '../views'))
expressNunjucks(app, {
  watch: isDev,
  noCache: isDev
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, '../public')))

// Attach routes
const indexController = iocContainer.get<IndexController>(TYPES.IndexController)
indexController.attachRoutes(app)

attachErrorHandling(app)

module.exports = app
