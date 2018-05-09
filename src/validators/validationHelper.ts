import { ValidationError } from 'class-validator'

export function convertValidationErrorsToViewErrors (validationErrors: ValidationError[]) {
  let result = {}

  if (validationErrors) {
    // We only care about first error for a given field name
    result = validationErrors.reduce(function(viewErrors, e) {
      (viewErrors[e.property] = viewErrors[e.property] || []).push(e.constraints[Object.keys(e.constraints)[0]])
      return viewErrors
    }, {})
  }

  return result
}
