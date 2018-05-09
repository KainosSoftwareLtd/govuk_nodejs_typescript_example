import * as express from 'express'
import { injectable } from 'inversify'
import { FormExampleModel } from '../models/formExampleModel'
import { validate } from 'class-validator'
import { convertValidationErrorsToViewErrors } from '../validators/validationHelper'

@injectable()
export class FormExampleController {

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

    return validate(formExampleModel).then(errors => {
      if (errors.length > 0) {
        return Promise.resolve(res.status(400).render('formExample.html', { data: req.body, errors: convertValidationErrorsToViewErrors(errors) }))
      } else {
        return Promise.resolve(res.redirect('/'))
      }
    })
  }

  public attachRoutes(app: express.Application) {
    const router = express.Router()
    app.use('/', router)

    router.get('/form-example', this.get.bind(this)) // needed so function can access instance of controller variables
    router.post('/form-example', this.post.bind(this))
  }
}
