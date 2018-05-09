import * as express from 'express'
import { injectable, inject } from 'inversify'
import { FormExampleModel } from '../models/formExampleModel'
import { validate } from 'class-validator'
import { convertValidationErrorsToViewErrors } from '../validators/validationHelper'
import { TYPES } from '../types'
import { FormCreationRequest, PreferredContactMethod } from '../models/formModels'
import { FormClientInterface } from '../services/formClient'

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

  public async post(req, res, next) {
    let formExampleModel = new FormExampleModel(
      req.body.fullName,
      req.body.dobDay,
      req.body.dobMonth,
      req.body.dobYear,
      req.body.preferredContactOption,
      req.body.contactEmail,
      req.body.contactPhone,
      req.body.contactSmsNumber
    )

    validate(formExampleModel).then(errors => {
      if (errors.length > 0) {
        return Promise.resolve(res.status(400).render('formExample.html', { data: req.body, errors: convertValidationErrorsToViewErrors(errors) }))
      }
    })

    // continue with call to service
    try {
      let result = await this.formClient.create(formExampleModel)
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
