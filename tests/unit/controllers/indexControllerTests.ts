import 'mocha'
import { expect } from 'chai'
import * as supertest from 'supertest'
import * as express from 'express'
import * as expressNunjucks from 'express-nunjucks'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import { TYPES } from '../../../src/types'
import { iocContainer } from '../../../src/ioc'
import { attachErrorHandling } from '../../../src/middleware/errorHandling'
import { IndexController } from '../../../src/controllers/indexController'

describe('IndexController', function () {
  let request
  let indexController

  beforeEach(function () {
    const app = express()
    app.set('views', path.join(__dirname, '../../../views'))
    expressNunjucks(app, { noCache: true })
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    indexController = iocContainer.get<IndexController>(TYPES.IndexController)
    indexController.attachRoutes(app)

    request = supertest(app)

    attachErrorHandling(app)
  })

  describe('GET /', function () {
    it('should return index response', () => {
      return request
        .get('/')
        .expect(200)
        .then(res => {
          expect(res.text).to.contain('This is an example service')
        })
    })
  })
})
