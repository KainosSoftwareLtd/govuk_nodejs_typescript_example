import { Form, ContactOption } from '../src/models/formExampleModel'
import { FormExampleModelList } from '../src/models/formExampleModelList'

export const FORM_RECORD: Form = {
  id: 1,
  fullName: 'test name',
  dobDay: 31,
  dobMonth: 3,
  dobYear: 1980,
  dob: new Date(),
  preferredContactOption: ContactOption.email,
  contactEmail: 'testemail@testing.com',
  contactPhone: '',
  contactSmsNumber: ''
}

export const FORM_LIST: FormExampleModelList = {
  data: [FORM_RECORD],
  start: 0,
  length: 1,
  orderColumn: '',
  orderAscending: true,
  recordsTotal: 1,
  recordsFiltered: 0
}

export const VALID_FORM_ID = 1
export const VALID_FULL_NAME = 'test name'
export const VALID_DOB_DAY = 1
export const VALID_DOB_MONTH = 2
export const VALID_DOB_YEAR = 1998
export const CURRENT_DATE = new Date()
export const VALID_EMAIL_CONTACT_OPTION = ContactOption.email
export const VALID_CONTACT_EMAIL_ADDRESS = 'testemail@testing.com'

export const NULL_INPUT = null

