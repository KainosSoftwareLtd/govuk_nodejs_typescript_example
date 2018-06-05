import * as express from 'express'
import { injectable } from 'inversify'
import { OK }  from 'http-status-codes'

@injectable()
export class HealthcheckController {

  private healthcheck(req, res, next) {
    /*
     * Calls to dependencies i.e. API will be made here
     * If any dependency is not healthy, then return a 500
     */
    return res.sendStatus(OK)
  }

  private status(req, res, next) {
    return res.sendStatus(OK)
  }

  public attachRoutes(router: express.Router) {
    router.get('/healthcheck', this.healthcheck.bind(this))
    router.get('/status', this.status.bind(this))
  }
}
