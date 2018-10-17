import * as express from 'express'
import { inject, injectable } from 'inversify'
import { TYPES } from '../types'
import { FormClientInterface } from '../services/formClient'

@injectable()
export class ListExampleController {
  private formClient: FormClientInterface

  public constructor(@inject(TYPES.FormClientInterface) formClient: FormClientInterface) {
    this.formClient = formClient
  }

  public async get(req, res, next) {
    try {
      // TODO get page/sort/filter details from request
      let list = await this.formClient.getList(0, 100, null, true)
      return res.render('list.html', list)
    } catch (error) {
      next(error)
    }
  }

  public attachRoutes(router: express.Router) {
    router.get('/list-example', this.get.bind(this)) // needed so function can access instance of controller variables
  }
}
