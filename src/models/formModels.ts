// Form
export interface Form {
    id: number
    ['full-name']: string
    dob: string
    ['preferred-contact-method']: PreferredContactMethod
    ['email-address']: string
    ['phone-number']: string
    ['mobile-phone-number']: string
  }

  export interface FormCreationRequest {
    ['full-name']: string
    dob: string
    ['preferred-contact-method']: PreferredContactMethod
    ['email-address']: string
    ['phone-number']: string
    ['mobile-phone-number']: string
  }

  export enum PreferredContactMethod {
    Email = 'EMAIL',
    Phone = 'PHONE',
    Text = 'TEXT'
  }
