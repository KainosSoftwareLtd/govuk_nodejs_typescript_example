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
      .click('#save-and-continue')

    // Index
      .waitForExist('#start')
  })
})
