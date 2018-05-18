import * as express from 'express'
import { injectable } from 'inversify'

const log = require('../middleware/logging/log')

@injectable()
export class IndexController {

  public async get(req, res, next) {
    log.info({request: req},"Getting the landing page")
    return await res.render('index.html')
  }

  public attachRoutes(app: express.Application) {
    const router = express.Router()
    app.use('/', router)

    router.get('/', this.get.bind(this)) // needed so function can access instance of controller variables
  }
}
