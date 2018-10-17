import 'mocha'
import { expect } from 'chai'
import * as supertest from 'supertest'
import * as express from 'express'
import * as expressNunjucks from 'express-nunjucks'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import { mock, instance, when, verify } from 'ts-mockito'
import { TYPES } from '../../../src/types'
import { iocContainer } from '../../../src/ioc'
import { attachErrorHandling } from '../../../src/middleware/errorHandling'
import { ListExampleController } from '../../../src/controllers/listExampleController'
import { FormClient } from '../../../src/services/formClient'
import * as fixtures from '../../Fixtures'

describe('ListExampleController', function () {
  let request
  let listExampleController
  let mockFormClient: FormClient

  beforeEach(function () {
    const app = express()
    app.set('views', path.join(__dirname, '../../../views'))
    expressNunjucks(app, { noCache: true })
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    mockFormClient = mock(FormClient)
    iocContainer.rebind(TYPES.FormClientInterface).toConstantValue(instance(mockFormClient))

    const router = express.Router()
    app.use('/', router)

    listExampleController = iocContainer.get<ListExampleController>(TYPES.ListExampleController)
    listExampleController.attachRoutes(router)

    request = supertest(app)

    attachErrorHandling(app)
  })

  describe('GET /list-example', function () {
    it('should return list response', () => {
      when(mockFormClient.getList(0, 100, null, true)).thenResolve(fixtures.FORM_LIST)

      return request
        .get('/list-example')
        .expect(200)
        .then(res => {
          expect(res.text).to.contain('List page example')
          expect(res.text).to.contain(fixtures.FORM_RECORD['full-name'])
          verify(mockFormClient.getList(0, 100, null, true)).once()
        })
    })
  })
})
