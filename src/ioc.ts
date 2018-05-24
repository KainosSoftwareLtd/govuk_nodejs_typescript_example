import 'reflect-metadata'
import { Container } from 'inversify'
import { TYPES } from './types'
import { IndexController } from './controllers/indexController'
import { FormExampleController } from './controllers/formExampleController'
import { FormClientInterface, FormClient } from './services/formClient'
import { SignInController } from './controllers/signInController'

const iocContainer = new Container()

iocContainer.bind<string>(TYPES.FormClientUrl).toConstantValue(process.env.API_URL || 'http://localhost:4000')

iocContainer.bind<string>('cognitoDomain').toConstantValue('streetmanagerodp.auth.us-east-2.amazoncognito.com')
iocContainer.bind<string>('cognitoClientId').toConstantValue('68igo5k1gu9r1f8s6mhsh5uq7b')
iocContainer.bind<string>('cognitoRedirect').toConstantValue('http://localhost:3000/sign-in/process')

iocContainer.bind<FormClientInterface>(TYPES.FormClientInterface).to(FormClient).inSingletonScope()
iocContainer.bind<IndexController>(TYPES.IndexController).to(IndexController)
iocContainer.bind<FormExampleController>(TYPES.FormExampleController).to(FormExampleController)
iocContainer.bind<SignInController>('signInController').to(SignInController)


export { iocContainer }
