import 'mocha'
import * as supertest from 'supertest'
import * as express from 'express'
import { TYPES } from '../../../src/types'
import { iocContainer } from '../../../src/ioc'
import { HealthcheckController } from '../../../src/controllers/healthcheckController'
import { OK } from 'http-status-codes'

describe('HealthcheckController', function () {
  let request
  let healthcheckController

  beforeEach(function () {
    const app = express()

    const router = express.Router()
    app.use('/', router)

    healthcheckController = iocContainer.get<HealthcheckController>(TYPES.HealthcheckController)
    healthcheckController.attachRoutes(router)

    request = supertest(app)
  })

  describe('GET /status', function () {
    it('should return OK response', () => {
      return request
        .get('/status')
        .expect(OK)
    })
  })

  describe('GET /healthcheck', function () {
    it('should return OK response if all dependencies are healthy', () => {
      return request
        .get('/healthcheck')
        .expect(OK)
    })
  })
})
