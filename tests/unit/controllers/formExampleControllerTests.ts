import 'mocha'
import { expect } from 'chai'
import * as supertest from 'supertest'
import * as express from 'express'
import * as nunjucks from 'nunjucks'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import { mock, instance, when, verify, anything, capture } from 'ts-mockito'
import { TYPES } from '../../../src/types'
import { iocContainer } from '../../../src/ioc'
import { FormClient } from '../../../src/services/formClient'
import { attachErrorHandling } from '../../../src/middleware/errorHandling'
import { FormExampleController } from '../../../src/controllers/formExampleController'
import * as fixtures from '../../Fixtures'

describe('FormExampleController', function () {
  let request
  let formExampleController
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

    formExampleController = iocContainer.get<FormExampleController>(TYPES.FormExampleController)
    formExampleController.attachRoutes(router)

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

  describe('POST /form-example', function () {
    it('should post form and return redirect', () => {
      when(mockFormClient.create(anything())).thenResolve(fixtures.VALID_FORM_ID)

      return request
        .post('/form-example')
        .send({
          fullName: fixtures.VALID_FULL_NAME,
          dobDay: fixtures.VALID_DOB_DAY,
          dobMonth: fixtures.VALID_DOB_MONTH,
          dobYear: fixtures.VALID_DOB_YEAR,
          preferredContactOption: fixtures.VALID_EMAIL_CONTACT_OPTION,
          contactEmail: fixtures.VALID_CONTACT_EMAIL_ADDRESS
        })
        .type('form')
        .expect(302)
        .expect('Location', '/form-example/1')
        .then(res => {
          verify(mockFormClient.create(anything())).once()
          const [mockForm] = capture(mockFormClient.create).last()
          expect(mockForm['contactEmail']).to.deep.equal('testemail@testing.com')
          expect(mockForm['fullName']).to.deep.equal('test name')
        })
    })

    it('should respond with 500 client error reject with error', () => {
      when(mockFormClient.create(anything())).thenReject('Error!')

      return request
        .post('/form-example')
        .send({
          fullName: fixtures.VALID_FULL_NAME,
          dobDay: fixtures.VALID_DOB_DAY,
          dobMonth: fixtures.VALID_DOB_MONTH,
          dobYear: fixtures.VALID_DOB_YEAR,
          preferredContactOption: fixtures.VALID_EMAIL_CONTACT_OPTION,
          contactEmail: fixtures.VALID_CONTACT_EMAIL_ADDRESS
        })
        .type('form')
        .expect(500)
      })

    it('should return a 500 client error', () => {
      when(mockFormClient.create(anything())).thenResolve(null)

      return request
        .post('/form-example')
        .send({
          fullName: fixtures.VALID_FULL_NAME,
          dobDay: fixtures.VALID_DOB_DAY,
          dobMonth: fixtures.VALID_DOB_MONTH,
          dobYear: fixtures.VALID_DOB_YEAR,
          preferredContactOption: fixtures.VALID_EMAIL_CONTACT_OPTION,
          contactEmail: fixtures.VALID_CONTACT_EMAIL_ADDRESS
        })
        .type('form')
        .expect(500)
    })

    it('should return 400 with form validation errors for invalid post', () => {
      return request
        .post('/form-example')
        .send({
          fullName: fixtures.NULL_INPUT,
          dobDay: fixtures.VALID_DOB_DAY,
          dobMonth: fixtures.VALID_DOB_MONTH,
          dobYear: fixtures.VALID_DOB_YEAR,
          preferredContactOption: fixtures.VALID_EMAIL_CONTACT_OPTION,
          contactEmail: fixtures.NULL_INPUT
        })
        .expect(400)
        .then(res => {
          expect(res.text).to.contain('There was a problem')
          expect(res.text).to.contain('Full name is required')
          expect(res.text).to.contain('Email address is required')
          expect(res.text).to.not.contain('Date of birth is required')
          expect(res.text).to.not.contain('Date of birth must be in the past')
          expect(res.text).to.not.contain('Preferred contact option is required')
        })
    })
  })

  describe('GET /form-example/1', function () {
    it('should return form response', () => {
      when(mockFormClient.get(1)).thenResolve(fixtures.FORM_RECORD)

      return request
        .get('/form-example/1')
        .expect(200)
        .then(res => {
          expect(res.text).to.contain(fixtures.FORM_RECORD['fullName'])
          verify(mockFormClient.get(1)).once()
        })
    })

    it('should respond with 500 client error', () => {
      when(mockFormClient.get(1)).thenReject('Error!')

      return request
        .get('/form-example/1')
        .expect(500)
    })

    it('should return a 404 client error', () => {
      when(mockFormClient.get(1)).thenResolve(null)
      return request
        .get('/form-example/1')
        .expect(404)
    })
  })
})
