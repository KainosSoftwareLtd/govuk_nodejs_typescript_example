import * as express from 'express'
import * as expressNunjucks from 'express-nunjucks'
import * as path from 'path'
import * as logger from 'morgan'
import * as cookieParser from 'cookie-parser'
import * as csrf from 'csurf'
import * as bodyParser from 'body-parser'
import * as favicon from 'serve-favicon'
import * as compression from 'compression'
import * as CognitoExpress from 'cognito-express'
import { TYPES } from './types'
import { iocContainer } from './ioc'
import { IndexController } from './controllers/indexController'
import { FormExampleController } from './controllers/formExampleController'
import { SignInController } from './controllers/signInController'
import { attachErrorHandling } from './middleware/errorHandling'
import { attachSecurityHeaders } from './middleware/securityHeaders'

const app = express()
const isDev = app.get('env') === 'development'

// view engine setup
app.set('views', path.join(__dirname, '../views'))
const njk = expressNunjucks(app, {
  watch: isDev,
  noCache: isDev
})

attachSecurityHeaders(app) // Helmet security headers and CSP

app.use(compression()) // GZIP compression
app.use(logger('dev'))
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

// Attach routes
const indexController = iocContainer.get<IndexController>(TYPES.IndexController)
const formExampleController = iocContainer.get<FormExampleController>(TYPES.FormExampleController)
const signInController = iocContainer.get<SignInController>('signInController')

const router = express.Router()
app.use('/', router)


// Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
  region: 'us-east-2',
  cognitoUserPoolId: 'us-east-2_uesVZYqbL',
  tokenUse: 'access'
})

const authenticatedRouter = express.Router()

authenticatedRouter.use(function(req, res, next) {
  let accessToken = req.cookies['AccessToken']

  if (!accessToken) {
    next({'status': 401})
  } else {
    cognitoExpress.validate(accessToken, function(err, response) {
      if (err) {
        next({'status': 401})
      }

      res.locals.user = response
      next()
  })
  }
})

authenticatedRouter.get('/', function(req, res, next) {
  if (res.locals.user['cognito:groups'].includes('Admin')) {
    res.send('Welcome admin')
  } else {
    next({'status': 401})
  }
})

app.use('/admin', authenticatedRouter)
indexController.attachRoutes(router)
formExampleController.attachRoutes(router)
signInController.attachRoutes(router)

attachErrorHandling(app)

module.exports = app
