import * as express from 'express'
import { injectable, inject } from 'inversify'
import { FormExampleModel } from '../models/formExampleModel'
import { validate, ValidationError } from 'class-validator'
import { convertValidationErrorsToViewErrors } from '../validators/validationHelper'
import { TYPES } from '../types'

import { FormClientInterface } from '../services/formClient'

@injectable()
export class FormExampleController {
  private formClient: FormClientInterface

  public constructor(@inject(TYPES.FormClientInterface) formClient: FormClientInterface) {
    this.formClient = formClient
  }

  // display the form
  public async get(req, res, next) {
    return await res.render('formExample.html', { data: {} })
  }

  public async post(req, res, next) {
    let formExampleModel = new FormExampleModel(
      req.body.fullName,
      parseInt(req.body.dobDay, 10),
      parseInt(req.body.dobMonth, 10),
      parseInt(req.body.dobYear, 10),
      req.body.preferredContactOption,
      req.body.contactEmail,
      req.body.contactPhone,
      req.body.contactSmsNumber
    )

    const createForm = async () => {
      let formId = await this.formClient.create(formExampleModel)
      if (formId) {
        res.redirect(`/form-example/${formId}`)
      } else {
        next(new Error('Problem saving form, please try again'))
      }
    }

    return validate(formExampleModel).then(errors => {
      if (errors.length > 0) {
        return res.status(400).render('formExample.html', { data: req.body, errors: convertValidationErrorsToViewErrors(errors) })
      } else {
        createForm()
      }
    })
  }

  // display the results of the input
  public async getSummary(req, res, next) {
    try {
      let form = await this.formClient.get(+req.params.id)
      if (form) {
        return res.render('summaryFormExample.html', { form })
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
