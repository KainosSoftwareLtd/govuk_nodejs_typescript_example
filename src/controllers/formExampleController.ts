import * as express from 'express'
import { injectable, inject } from 'inversify'
import { TYPES } from '../types'
import { FormCreationRequest, PreferredContactMethod } from '../models/formModels'
import { FormClientInterface } from '../services/formClient'
import * as bodyParser from 'body-parser'


@injectable()
export class FormExampleController {
  private formClient: FormClientInterface

  public constructor(@inject(TYPES.FormClientInterface) formClient: FormClientInterface) {
    this.formClient = formClient
  }

  // display the form
  public async get(req, res, next) {
    return Promise.resolve(res.render('formExample.html', { data: {} }))
  }

  // post the form
  public async post(req, res, next) {
    try {
      let day = req.body['dob-day']
      let month = req.body['dob-month']
      let year = req.body['dob-year']

      let formCreationRequest: FormCreationRequest = {
      'full-name': req.body['full-name'],
      dob: day.concat(month, year),
      'preferred-contact-method': PreferredContactMethod.Email,
      'email-address': req.body['contact-email'],
      'phone-number': req.body['contact-phone'],
      'mobile-phone-number': req.body['contact-text-message'],
    }
      let result = await this.formClient.create(formCreationRequest)
      if (result) {
        let id = result
        res.redirect(`/form-example/${id}`)
      } else {
        next(new Error('Problem saving form, please try again'))
      }
    } catch (error) {
      next(error)
    }
  }

  // display the results of the input
  public async getSummary(req, res, next) {
    try {
      let form = await this.formClient.get(+req.params.id)
      if (form) {
        return Promise.resolve(res.render('summaryFormExample.html', { form }))
      } else {
        res.status(404)
        next()
      }
    } catch (error) {
      next(error)
    }
  }

  public attachRoutes(app: express.Application) {
    const router = express.Router()
    app.use('/', router)

    router.get('/form-example', this.get.bind(this)) // needed so function can access instance of controller variables
    router.post('/form-example', this.post.bind(this))
    router.get('/form-example/:id', this.getSummary.bind(this))
  }
}
