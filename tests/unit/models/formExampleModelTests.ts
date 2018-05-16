import 'mocha'
import { expect } from 'chai'
import { FormExampleModel, ContactOption } from '../../../src/models/formExampleModel'
import { Validator } from 'class-validator'

const validator = new Validator()

describe('FormExampleModel', function () {

  describe('constructor', function () {

    it('should populate the date', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 1, 2, 1990, ContactOption.email, 'test@test.com', null, null)

      expect(formExampleModel.dob.getFullYear()).to.equal(1990)
    })

    it('should not populate the date when date does not exist', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 31, 9, 1990, ContactOption.email, 'test@test.com', null, null)

      expect(formExampleModel.dob).to.eql(new Date(NaN))
    })

    it('should not populate the date when no values provided', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', null, null, null, ContactOption.email, 'test@test.com', null, null)

      expect(formExampleModel.dob.getFullYear()).to.eql(NaN)
    })
  })

  describe('model properties', function () {

    it('should return one validation error if full name exceeds allowed text size', async () => {
      let testName = 'a'.repeat(52)
      let formExampleModel = new FormExampleModel(testName, 1, 2, 1990, ContactOption.sms, null, null, '11111')

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(1)
      expect(validationErrors[0].property).to.equal('fullName')
      expect(validationErrors[0].constraints['maxLength']).to.equal('fullName must be shorter than or equal to 50 characters')
    })

    it('should return no validation errors when valid input', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 1, 2, 1990, ContactOption.email, 'test@test.com', null, null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(0)
      expect(formExampleModel.dob.getFullYear()).to.equal(1990)
    })

    it('should return one validation error when date does not exist', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 31, 9, 1990, ContactOption.email, 'test@test.com', null, null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(1)
      expect(validationErrors[0].property).to.equal('dob')
      expect(validationErrors[0].constraints['isDate']).to.equal('Date of birth is required')
    })

    it('should return one validation error when date is in the future', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', new Date().getDate(), new Date().getMonth() + 2, new Date().getFullYear(), ContactOption.email, 'test@test.com', null, null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(1)
      expect(validationErrors[0].property).to.equal('dob')
      expect(validationErrors[0].constraints['maxDate']).to.equal('Date of birth must be in the past')
    })

    it('should return two validation errors when year is in the future', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 30, 9, new Date().getFullYear() + 1, ContactOption.email, 'test@test.com', null, null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(2)
      expect(validationErrors[0].property).to.equal('dobYear')
      expect(validationErrors[1].property).to.equal('dob')
      expect(validationErrors[0].constraints['max']).to.equal('Date of birth is required')
    })

    it('should return two validation errors when month is not a valid month', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 30, 14, 2018, ContactOption.email, 'test@test.com', null, null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(2)
      expect(validationErrors[0].property).to.equal('dobMonth')
      expect(validationErrors[1].property).to.equal('dob')
      expect(validationErrors[0].constraints['max']).to.equal('Date of birth is required')
    })

    it('should return four validation errors when no values provided', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', null, null, null, ContactOption.email, 'test@test.com', null, null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(4)
      expect(validationErrors[0].property).to.equal('dobDay')
      expect(validationErrors[1].property).to.equal('dobMonth')
      expect(validationErrors[2].property).to.equal('dobYear')
      expect(validationErrors[3].property).to.equal('dob')
      expect(validationErrors[0].constraints['min']).to.equal('Date of birth is required')
    })

    it('should not validate email input if email contact option is not selected', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 1, 2, 1990, ContactOption.phone, 'skdfjldks', '11111', null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(0)
    })

    it('should validate email input if email contact option is selected', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 1, 2, 1990, ContactOption.email, 'skdfjldks', null, null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(1)
      expect(validationErrors[0].property).to.equal('contactEmail')
      expect(validationErrors[0].constraints['isEmail']).to.equal('contactEmail must be an email')
    })

    it('should validate sms input if sms contact option is selected', async () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 1, 2, 1990, ContactOption.sms, null, null, null)

      const validationErrors = await validator.validate(formExampleModel)

      expect(validationErrors.length).to.be.equal(1)
      expect(validationErrors[0].property).to.equal('contactSmsNumber')
      expect(validationErrors[0].constraints['isNotEmpty']).to.equal('Mobile phone number is required')
    })
  })
})
