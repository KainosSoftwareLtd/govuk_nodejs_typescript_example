import { injectable, inject } from 'inversify'
import axios from 'axios'
import { TYPES } from '../types'
import { FormExampleModel } from '../models/formExampleModel'
import { FormExampleModelList } from '../models/formExampleModelList'

export interface FormClientInterface {
    create(formExampleModel: FormExampleModel)
    get(id: number)
    getList(start: number, length: number, orderColumn: string, orderAscending: boolean): Promise<FormExampleModelList>
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

    public async getList(start: number, length: number, orderColumn: string, orderAscending: boolean): Promise<FormExampleModelList> {
      return axios.get(`${this.url}/exampleForm?_start=${start}&_end=${start + length}`)
          .then((response) => {
            let total = +response.headers['X-Total-Count']
            return new FormExampleModelList(response.data, start, length, orderColumn, orderAscending, total, total)
          })
    }
}
