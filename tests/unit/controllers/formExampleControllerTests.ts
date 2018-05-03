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
import { FormExampleController } from '../../../src/controllers/formExampleController'

describe('FormExampleController', function () {
  let request
  let formExampleController

  beforeEach(function () {
    const app = express()
    app.set('views', path.join(__dirname, '../../../views'))
    expressNunjucks(app, { noCache: true })
    app.use(bodyParser.urlencoded({ extended: false }))

    formExampleController = iocContainer.get<FormExampleController>(TYPES.FormExampleController)
    formExampleController.attachRoutes(app)

    request = supertest(app)

    attachErrorHandling(app)
  })

  describe('GET /form-example', function () {
    it('should return form response', () => {
      return request
        .get('/form-example')
        .expect(200)
        .then(res => {
          expect(res.text).to.contain('Enter your details')
        })
    })
  })
})
