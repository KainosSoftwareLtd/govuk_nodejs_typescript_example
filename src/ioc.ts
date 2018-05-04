import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { IndexController } from './controllers/indexController'
import { FormExampleController } from './controllers/formExampleController'

const iocContainer = new Container()

iocContainer.bind<IndexController>(TYPES.IndexController).to(IndexController)
iocContainer.bind<FormExampleController>(TYPES.FormExampleController).to(FormExampleController)

export { iocContainer }
