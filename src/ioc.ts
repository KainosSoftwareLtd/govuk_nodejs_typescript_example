import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { IndexController } from './controllers/indexController'

const iocContainer = new Container()

iocContainer.bind<IndexController>(TYPES.IndexController).to(IndexController)

export { iocContainer }
