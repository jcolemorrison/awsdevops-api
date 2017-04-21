'use strict'

const expect = require('chai').expect
const clientController = require('../../../server/models/client.js')

describe('Client Model Controller', function () {
  it('should exist', () => {
    expect(clientController()).to.equal(undefined)
    expect(clientController).to.exist
  })
})
