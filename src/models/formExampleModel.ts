import { MaxLength, IsNotEmpty, IsInt, Min, Max, IsDate, MaxDate, ValidateIf, IsEmail, validate, Validate } from 'class-validator'
import { getIsRequired } from '../validators/validationErrorMessages'

export class FormExampleModel {

  @MaxLength(50) // TODO move validation error messages to constants format
  @IsNotEmpty({ message: getIsRequired('Full name') }) // last decorator is first error displayed (FILO stack, only one displayed per field)
  fullName: string

  @IsInt({ message: getIsRequired('Date of birth') })
  @Min(1, { message: getIsRequired('Date of birth') })
  @Max(31, { message: getIsRequired('Date of birth') })
  dobDay: number

  @IsInt({ message: getIsRequired('Date of birth') })
  @Min(1, { message: getIsRequired('Date of birth') })
  @Max(12, { message: getIsRequired('Date of birth') })
  dobMonth: number

  @IsInt({ message: getIsRequired('Date of birth') })
  @Min(1900, { message: getIsRequired('Date of birth') })
  @Max(new Date().getFullYear(), { message: getIsRequired('Date of birth') })
  dobYear: number

  // TODO extend example to show child date class and display of date validation error messages
  @MaxDate(new Date(), { message: 'Date of birth must be in the past' })
  @IsDate({ message: getIsRequired('Date of birth') })
  @IsNotEmpty({ message: getIsRequired('Date of birth') })
  dob: Date

  @IsNotEmpty({ message: getIsRequired('Preferred contact option') })
  preferredContactOption: ContactOption

  @ValidateIf(o => o.preferredContactOption === 'email')
  @IsEmail()
  @IsNotEmpty({ message: getIsRequired('Email address') })
  contactEmail: string

  @ValidateIf(o => o.preferredContactOption === 'phone')
  @IsNotEmpty({ message: getIsRequired('Phone number') })
  contactPhone: string

  @ValidateIf(o => o.preferredContactOption === 'sms')
  @IsNotEmpty({ message: getIsRequired('Mobile phone number') })
  contactSmsNumber: string

  public constructor (fullName: string, dobDay: number, dobMonth: number, dobYear: number, preferredContactOption: ContactOption, contactEmail: string, contactPhone: string, contactSmsNumber: string) {
    this.fullName = fullName
    this.dobDay = dobDay
    this.dobMonth = dobMonth
    this.dobYear = dobYear
    this.preferredContactOption = preferredContactOption
    this.contactEmail = contactEmail
    this.contactPhone = contactPhone
    this.contactSmsNumber = contactSmsNumber

    this.dob = new Date(this.dobYear, this.dobMonth - 1, this.dobDay)// month arg is 0-based i.e. January = 0
    if (this.dob.getMonth() + 1 !== this.dobMonth) { // 31 Feb rolls over to 3 Mar so check that month input matches month generated by new Date() function
      this.dob = new Date(NaN) // Invalid date
    }
  }
}

export class Form {
  id: number

  fullName: string

  dobDay: number

  dobMonth: number

  dobYear: number

  dob: Date

  preferredContactOption: ContactOption

  contactEmail: string

  contactPhone: string

  contactSmsNumber: string

  public constructor (id: number, fullName: string, dobDay: number, dobMonth: number, dobYear: number, preferredContactOption: ContactOption, contactEmail: string, contactPhone: string, contactSmsNumber: string) {
    this.id = id
    this.fullName = fullName
    this.dobDay = dobDay
    this.dobMonth = dobMonth
    this.dobYear = dobYear
    this.preferredContactOption = preferredContactOption
    this.contactEmail = contactEmail
    this.contactPhone = contactPhone
    this.contactSmsNumber = contactSmsNumber

    try {
      this.dob = new Date(this.dobYear, this.dobMonth, this.dobDay)
    } catch {
      this.dob = null
    }
  }
}

export enum ContactOption {
  email = 'email',
  phone = 'phone',
  sms = 'sms'
}
