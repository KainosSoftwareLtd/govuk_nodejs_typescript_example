import 'mocha'
import { expect } from 'chai'
import * as supertest from 'supertest'
import * as express from 'express'
import * as nunjucks from 'nunjucks'
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
    let appViews = [
      path.join(__dirname, '../../../node_modules/govuk-frontend/'),
      path.join(__dirname, '../../../node_modules/govuk-frontend/components'),
      path.join(__dirname, '../../../views')
    ]
    let nunjucksConfig = {
      autoescape: true,
      noCache: true,
      express: app
    }
    nunjucks.configure(appViews, nunjucksConfig)
    app.set('view engine', 'html')

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
          expect(res.text).to.contain(fixtures.FORM_RECORD['fullName'])
          verify(mockFormClient.getList(0, 100, null, true)).once()
        })
    })
  })
})
