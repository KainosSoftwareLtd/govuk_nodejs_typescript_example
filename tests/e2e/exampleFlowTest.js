/* eslint-env mocha */
/* global browser */

describe('Example flow test', () => {
  it('should allow submission on FormExample', () => {
    return browser.url('/')

      // Index
      .waitForExist('#start')
      .click('#start')

      // FormExample
      .waitForExist('#fullName')
      .setValue('#fullName', 'Joe Bloggs')
      .waitForExist('#dobDay')
      .setValue('#dobDay', 1)
      .waitForExist('#dobMonth')
      .setValue('#dobMonth', 2)
      .waitForExist('#dobYear')
      .setValue('#dobYear', 2015)
      .waitForExist('#example-contact-by-email')
      .click('#example-contact-by-email')
      .waitForExist('#contactEmail')
      .setValue('#contactEmail', 'testemail@email.com')
      .click('#save-and-continue')

    // Index
      .waitForExist('#summaryTable')
  })
})
