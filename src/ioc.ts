import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { IndexController } from './controllers/indexController'
import { FormExampleController } from './controllers/formExampleController'
import { FormClientInterface, FormClient } from './services/formClient'

const iocContainer = new Container()

iocContainer.bind<string>(TYPES.FormClientUrl).toConstantValue(process.env.API_URL || 'http://localhost:4000')
iocContainer.bind<FormClientInterface>(TYPES.FormClientInterface).to(FormClient).inSingletonScope()
iocContainer.bind<IndexController>(TYPES.IndexController).to(IndexController)
iocContainer.bind<FormExampleController>(TYPES.FormExampleController).to(FormExampleController)

export { iocContainer }
