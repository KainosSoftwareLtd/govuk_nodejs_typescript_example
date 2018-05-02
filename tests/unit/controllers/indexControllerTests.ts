import 'mocha'
import { expect } from 'chai'
import * as supertest from 'supertest'
import * as express from 'express'
import * as expressNunjucks from 'express-nunjucks'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import { TYPES } from '../../../src/types'
import { iocContainer } from '../../../src/ioc'
import { IndexController } from '../../../src/controllers/indexController'

describe('IndexController', function () {
  let request
  let indexController

  beforeEach(function () {
    const app = express()
    app.set('views', path.join(__dirname, '../../../views'))
    expressNunjucks(app, { noCache: true })
    app.use(bodyParser.urlencoded({ extended: false }))

    indexController = iocContainer.get<IndexController>(TYPES.IndexController)
    indexController.attachRoutes(app)

    request = supertest(app)

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      let err = new Error('Not Found')
      err['status'] = 404
      next(err)
    })

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      // render the error page
      res.status(err.status || 500)
      res.render('error')
    })
  })

  describe('GET /', function () {
    it('should return index response', () => {
      return request
        .get('/')
        .expect(200)
        .then(res => {
          expect(res.text).to.contain('Example service')
        })
    })
  })
})
