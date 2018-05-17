import { Form, ContactOption, FormExampleModel } from '../src/models/formExampleModel'


export const FORM_RECORD: Form = {
  id: 1,
  fullName:  'test name',
  dobDay: 31,
  dobMonth: 3,
  dobYear: 1980,
  dob: new Date(),
  preferredContactOption: ContactOption.email,
  contactEmail: 'testemail@testing.com',
  contactPhone: '',
  contactSmsNumber: ''
  }

  export const FORM_EXAMPLE_INPUT: FormExampleModel = {
    fullName:  'test name',
    dobDay: 31,
    dobMonth: 3,
    dobYear: 1980,
    dob: new Date(),
    preferredContactOption: ContactOption.email,
    contactEmail: 'testemail@testing.com',
    contactPhone: '',
    contactSmsNumber: ''
    }

