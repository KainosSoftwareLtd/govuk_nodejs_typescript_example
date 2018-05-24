import * as express from 'express'
import { injectable } from 'inversify'
import { iocContainer } from '../ioc'
import axios from 'axios'
import * as querystring from 'querystring'

@injectable()
export class SignInController {

    public get(req, res, next) {
        let domain = iocContainer.get<string>('cognitoDomain')
        let clientId = iocContainer.get<string>('cognitoClientId')
        let callback = iocContainer.get<string>('cognitoRedirect')

        let redirectUrl = `https://${domain}/login?response_type=code&client_id=${clientId}&redirect_uri=${callback}`
        return res.redirect(redirectUrl)
    }

    public async get_process_auth(req, res, next) {
        let domain = iocContainer.get<string>('cognitoDomain')
        let clientId = iocContainer.get<string>('cognitoClientId')
        let callback = iocContainer.get<string>('cognitoRedirect')
        let authCode = req.query.code

        try {
            let params = querystring.stringify(
                {'grant_type': 'authorization_code',
                'client_id': clientId,
                'code': authCode,
                'redirect_uri': callback})

            let tokenExchange = await axios.post(`https://${domain}/oauth2/token`, params,
                {'headers': {'content-type': 'application/x-www-form-urlencoded'}})
            res.cookie('AccessToken', tokenExchange.data['access_token'])

            return res.redirect('/admin')
        } catch (err) {
            return Promise.reject(err)
        }
    }

    public attachRoutes(router: express.Router) {
        router.get('/sign-in', this.get.bind(this))
        router.get('/sign-in/process', this.get_process_auth.bind(this))
    }
}
