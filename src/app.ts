import * as express from 'express'
import * as nunjucks from 'nunjucks'
import * as path from 'path'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as csrf from 'csurf'
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import { attachErrorHandling } from './middleware/errorHandling'
import { attachSecurityHeaders } from './middleware/securityHeaders'
import { attachRoutes } from './routes'

const app = express()
// const isDev = app.get('env') === 'development' // Use for caching etc. in development

// view engine setup
let appViews = [
  path.join(__dirname, '../node_modules/govuk-frontend/'),
  path.join(__dirname, '../node_modules/govuk-frontend/components'),
  path.join(__dirname, '../views')
]
let nunjucksConfig = {
  autoescape: true,
  noCache: true,
  express: app
}
nunjucks.configure(appViews, nunjucksConfig)
app.set('view engine', 'html')

attachSecurityHeaders(app) // Helmet security headers and CSP

app.use(compression()) // GZIP compression
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(csrf({ cookie: true }))
app.use('/public', express.static(path.join(__dirname, '../public')))

// Add variables that are available in all views.
app.use(function (req, res, next) {
  res.locals.asset_path = '/public/'
  res.locals.serviceName = 'Example service' // TODO replace with service name
  res.locals.releaseVersion = 'v0.1' // TODO replace with package.json version
  res.locals.csrfToken = req.csrfToken()

  next()
})

attachRoutes(app)

attachErrorHandling(app)

module.exports = app
