import 'mocha'
import { expect } from 'chai'
import { FormExampleModel } from '../../../src/models/formExampleModel'
import { convertValidationErrorsToViewErrors } from '../../../src/validators/validationHelper'
import { validate } from 'class-validator'

describe('ValidationHelper', function () {
  describe('convertValidationErrorsToViewErrors', function () {
    it('should return object with first error per property', () => {
      let formExampleModel = new FormExampleModel(null, null, null, null, null, null, null, null, null)

      return validate(formExampleModel).then(errors => {
        let result = convertValidationErrorsToViewErrors(errors)

        expect(result['fullName']).to.equal('Full name is required')
        expect(result['dobDay']).to.equal('Date of birth is required')
        expect(result['dobMonth']).to.equal('Date of birth is required')
        expect(result['dobYear']).to.equal('Date of birth is required')
        expect(result['dob']).to.equal('Date of birth is required')
        expect(result['preferredContactOption']).to.equal('Preferred contact option is required')
      })
    })
  })
})
