import * as express from 'express'
import * as expressNunjucks from 'express-nunjucks'
import * as path from 'path'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as bodyParser from 'body-parser'
import * as favicon from 'serve-favicon'
import * as compression from 'compression'
import { TYPES } from './types'
import { iocContainer } from './ioc'
import { IndexController } from './controllers/indexController'
import { attachErrorHandling } from './middleware/errorHandling'
import { attachSecurityHeaders } from './middleware/securityHeaders'

const app = express()
const isDev = app.get('env') === 'development'

// view engine setup
app.set('views', path.join(__dirname, '../views'))
expressNunjucks(app, {
  watch: isDev,
  noCache: isDev
})

attachSecurityHeaders(app) // Helmet security headers and CSP

app.use(compression()) // GZIP compression
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/public', express.static(path.join(__dirname, '../govuk_modules', 'govuk_template')))
app.use('/public', express.static(path.join(__dirname, '../govuk_modules', 'govuk_frontend_toolkit')))
app.use(favicon(path.join(__dirname, '../govuk_modules', 'govuk_template', 'images', 'favicon.ico')))

// Add variables that are available in all views.
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  res.locals.serviceName = 'Example service' // TODO replace with service name
  res.locals.releaseVersion = 'v0.1' // TODO replace with package.json version
  next()
})

// Attach routes
const indexController = iocContainer.get<IndexController>(TYPES.IndexController)
indexController.attachRoutes(app)

attachErrorHandling(app)

module.exports = app
