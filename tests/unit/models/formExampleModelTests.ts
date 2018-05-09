import 'mocha'
import { expect } from 'chai'
import { FormExampleModel, ContactOption } from '../../../src/models/formExampleModel'

describe('FormExampleModel', function () {
  describe('constructor', function () {
    it('should populate the date', () => {
      let formExampleModel = new FormExampleModel('Joe Bloggs', 1, 2, 1990, ContactOption.email, 'test@test.com', null, null)

      expect(formExampleModel.dob.getFullYear()).to.equal(1990)
    })
  })

  // TODO Validation tests
})
