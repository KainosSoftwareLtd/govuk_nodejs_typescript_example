import { injectable, inject } from 'inversify'
import axios from 'axios'
import { TYPES } from '../types'
import { FormExampleModel } from '../models/formExampleModel'

export interface FormClientInterface {
    create(formExampleModel: FormExampleModel)
    get(id: number)
}

@injectable()
export class FormClient implements FormClientInterface {
    url: string
    constructor(@inject(TYPES.FormClientUrl) formClientUrl: string) {
    this.url = formClientUrl
  }

    public async create(formExampleModel: FormExampleModel) {
        return axios.post(`${this.url}/exampleForm`, formExampleModel)
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
