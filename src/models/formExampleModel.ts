import { MaxLength, IsNotEmpty } from 'class-validator'

export class FormExampleModel {
  @MaxLength(50, { message: 'Your full name is too long' }) // TODO move validation error messages to constants format
  @IsNotEmpty({ message: 'Your full name is required' }) // last decorator is first error displayed (FILO stack, only one displayed per field)
  fullName: string

  // @IsInt()
  // @Min(1)
  // @Max(31)
  dobDay: number

  // @IsInt()
  // @Min(1)
  // @Max(12)
  dobMonth: number

  // @IsInt()
  // @Min(1900)
  // @Max(2018)
  dobYear: number

  // TODO extend example to show child date class and display of date validation error messages
  // @IsNotEmpty()
  // @IsDate()
  dob: Date

  // @IsNotEmpty()
  preferredContactOption: ContactOption

  // TODO extend example to show required-if validation
  // @IsEmail()
  contactEmail: string

  contactPhone: string

  contactSmsNumber: string

  public constructor (fullName: string, dobDay: number, dobMonth: number, dobYear: number, preferredContactOption: ContactOption,   contactEmail: string, contactPhone: string, contactSmsNumber: string) {
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
  email = 'EMAIL',
  phone = 'PHONE',
  sms = 'SMS'
}
