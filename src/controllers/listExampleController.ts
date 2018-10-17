import * as express from 'express'
import { injectable } from 'inversify'

@injectable()
export class ListExampleController {

  public async get(req, res, next) {
    return await res.render('list.html')
  }

  public attachRoutes(router: express.Router) {
    router.get('/list-example', this.get.bind(this)) // needed so function can access instance of controller variables
  }
}
