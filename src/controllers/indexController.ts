import * as express from 'express'
import { injectable } from 'inversify'
import { logger } from '../middleware/logger'

@injectable()
export class IndexController {

  public async get(req, res, next) {
    logger.log('Using the winston logger to get the landing page. Unique request id: ')
    return await res.render('index.html')
  }

  public attachRoutes(app: express.Application) {
    const router = express.Router()
    app.use('/', router)

    router.get('/', this.get.bind(this)) // needed so function can access instance of controller variables
  }
}
