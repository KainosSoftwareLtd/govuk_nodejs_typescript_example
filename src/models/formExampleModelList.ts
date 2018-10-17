import { FormExampleModel } from './formExampleModel'

export class FormExampleModelList {

  data: FormExampleModel[] = []
  start = 0
  length = 0
  orderColumn: string
  orderAscending: boolean
  recordsTotal = 0
  recordsFiltered = 0

  public constructor (data: FormExampleModel[], start: number, length: number, orderColumn: string, orderAscending: boolean, recordsTotal: number, recordsFiltered: number) {
    this.data = data
    this.start = start
    this.length = length
    this.orderColumn = orderColumn
    this.orderAscending = orderAscending
    this.recordsTotal = recordsTotal
    this.recordsFiltered = recordsFiltered
  }
}
