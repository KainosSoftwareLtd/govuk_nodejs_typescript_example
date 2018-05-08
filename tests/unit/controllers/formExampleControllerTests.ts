import 'mocha'
import { expect } from 'chai'
import * as supertest from 'supertest'
import * as express from 'express'
import * as expressNunjucks from 'express-nunjucks'
import * as path from 'path'
import * as bodyParser from 'body-parser'
import { mock, instance, when, verify, anything, capture } from 'ts-mockito'
import { TYPES } from '../../../src/types'
import { iocContainer } from '../../../src/ioc'
import { Form, PreferredContactMethod, FormCreationRequest } from '../../../src/models/formModels'
import { FormClient } from '../../../src/services/formClient'
import { attachErrorHandling } from '../../../src/middleware/errorHandling'
import { FormExampleController } from '../../../src/controllers/formExampleController'
import { FORM1 } from '../../Fixtures'

describe('FormExampleController', function () {
  let request
  let formExampleController
  let mockFormClient: FormClient
  let form1: Form = FORM1

  beforeEach(function () {
    const app = express()
    app.set('views', path.join(__dirname, '../../../views'))
    expressNunjucks(app, { noCache: true })
    app.use(bodyParser.urlencoded({ extended: false }))

    mockFormClient = mock(FormClient)
    iocContainer.rebind(TYPES.FormClientInterface).toConstantValue(instance(mockFormClient))

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

  describe('POST /form-example', function () {
    it('should post form and return redirect', () => {
      when(mockFormClient.create(anything())).thenResolve(form1.id)

      request
        .post('/form-example')
        .send({
          'full-name': 'test name',
          'dob-day': '01',
          'dob-month': '04',
          'dob-year': '1997',
          'contact-email': 'testemail@testing.com',
          'contact-phone': null,
          'contact-text-message': null,
        })
        .type('form')
        .expect(302)
        .expect('Location', '/form-example/1')
        .then(res => {
          verify(mockFormClient.create(anything())).once()
          const [mockForm] = capture(mockFormClient.create).last()
          expect(mockForm['email-address']).to.deep.equal('testemail@testing.com')
          expect(mockForm['dob']).to.deep.equal('01041997')
        })
    })

    it('should respond with 500 client error', () => {
      when(mockFormClient.create(anything())).thenReject('Error!')

      return request
        .post('/form-example')
        .send({
          'full-name': 'test name',
          'dob-day': '01',
          'dob-month': '04',
          'dob-year': '1997',
          'contact-email': 'testemail@testing.com',
          'contact-phone': null,
          'contact-text-message': null,
        })
        .type('form')
        .expect(500)
      })

    it('should return a 500 client error', () => {
      when(mockFormClient.create(anything())).thenResolve(null)

      return request
        .post('/form-example')
        .send({
          'full-name': 'test name',
          'dob-day': '01',
          'dob-month': '04',
          'dob-year': '1997',
          'contact-email': 'testemail@testing.com',
          'contact-phone': null,
          'contact-text-message': null,
        })
        .type('form')
        .expect(500)
    })
  })

  describe('GET /form-example/1', function () {
    it('should return form response', () => {
      when(mockFormClient.get(1)).thenResolve(form1)

      return request
        .get('/form-example/1')
        .expect(200)
        .then(res => {
          expect(res.text).to.contain(form1['full-name'])
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
