import { injectable, inject } from 'inversify'
import axios from 'axios'
import { TYPES } from '../types'
import { Form, FormCreationRequest } from '../models/formModels'

export interface FormClientInterface {
    create(userCreationRequest: FormCreationRequest)
    get(id: number)
}

@injectable()
export class FormClient implements FormClientInterface {
    url: string
    constructor(@inject(TYPES.FormClientUrl) formClientUrl: string) {
    this.url = formClientUrl
  }

    public async create(formCreationRequest: FormCreationRequest) {
        return axios.post(`${this.url}/exampleForm`, formCreationRequest)
          .then((response) => {
            return response.data.id
          })
    }

    public async get(id: number) {
        return axios.get(`${this.url}/exampleForm/${id}`)
          .then((response) => {
            return response.data
          })
      }
}
