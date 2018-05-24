import * as express from 'express'
import { injectable } from 'inversify'

@injectable()
export class IndexController {

  public async get(req, res, next) {
    return await res.render('index.html')
  }

  public attachRoutes(router: express.Router) {
    router.get('/', this.get.bind(this)) // needed so function can access instance of controller variables
  }
}
