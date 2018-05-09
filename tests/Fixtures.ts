import { Form, ContactOption } from '../src/models/formExampleModel'


export const FORM1: Form = {
  id: 1,
  fullName:  'full name',
  dobDay: 31,
  dobMonth: 3,
  dobYear: 1980,
  dob: new Date(),
  preferredContactOption: ContactOption.email,
  contactEmail: 'contactemail@testing.com',
  contactPhone: '',
  contactSmsNumber: ''
  }

