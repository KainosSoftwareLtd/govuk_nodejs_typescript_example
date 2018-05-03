import * as express from 'express'
import { injectable } from 'inversify'

@injectable()
export class FormExampleController {

  public async get(req, res, next) {
    return Promise.resolve(res.render('formExample.html', { data: {} }))
  }

  public attachRoutes(app: express.Application) {
    const router = express.Router()
    app.use('/', router)

    router.get('/form-example', this.get.bind(this)) // needed so function can access instance of controller variables
  }
}
