import * as express from 'express'
import { TYPES } from './types'
import { iocContainer } from './ioc'
import { IndexController } from './controllers/indexController'
import { HealthcheckController } from './controllers/healthcheckController'
import { FormExampleController } from './controllers/formExampleController'
import { ListExampleController } from './controllers/listExampleController'

export function attachRoutes(app: express.Application): void {
  const indexController = iocContainer.get<IndexController>(TYPES.IndexController)
  const formExampleController = iocContainer.get<FormExampleController>(TYPES.FormExampleController)
  const listExampleController = iocContainer.get<ListExampleController>(TYPES.ListExampleController)
  const healthcheckController = iocContainer.get<HealthcheckController>(TYPES.HealthcheckController)

  const router = express.Router()
  app.use('/', router)

  indexController.attachRoutes(router)
  formExampleController.attachRoutes(router)
  listExampleController.attachRoutes(router)
  healthcheckController.attachRoutes(router)
}
