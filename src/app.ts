import * as express from 'express'
import * as expressNunjucks from 'express-nunjucks'
import * as path from 'path'
import { errorLogger } from 'express-winston'
import { expressLogger, errorLoggerOptions } from './middleware/expressLogger'
import * as cookieParser from 'cookie-parser'
import * as csrf from 'csurf'
import * as bodyParser from 'body-parser'
import * as favicon from 'serve-favicon'
import * as compression from 'compression'
import { TYPES } from './types'
import { iocContainer } from './ioc'
import { IndexController } from './controllers/indexController'
import { FormExampleController } from './controllers/formExampleController'
import { attachErrorHandling } from './middleware/errorHandling'
import { attachSecurityHeaders } from './middleware/securityHeaders'
import { middleware, set } from 'express-http-context'

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/public', express.static(path.join(__dirname, '../govuk_modules', 'govuk_template')))
app.use('/public', express.static(path.join(__dirname, '../govuk_modules', 'govuk_frontend_toolkit')))
app.use(favicon(path.join(__dirname, '../govuk_modules', 'govuk_template', 'images', 'favicon.ico')))

// Add variables that are available in all views.
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  res.locals.serviceName = 'Example service' // TODO replace with service name
  res.locals.releaseVersion = 'v0.1' // TODO replace with package.json version
  res.locals.csrfToken = req.csrfToken()

  next()
})

app.use(middleware) // use the express-http-request middleware in order to set a unique request id

// Log each HTML request and its response.
app.use(function(req, res, next) {
  set('reqId', '12345')
  set('appName', 'govuk_nodejs_typescript_example')
  next()
})

app.use(expressLogger)

// Attach routes
const indexController = iocContainer.get<IndexController>(TYPES.IndexController)
const formExampleController = iocContainer.get<FormExampleController>(TYPES.FormExampleController)

indexController.attachRoutes(app)
formExampleController.attachRoutes(app)

// try out error handling
// Create a winston instance, can be configured however you want.
app.use(errorLogger(errorLoggerOptions))

attachErrorHandling(app)

module.exports = app
