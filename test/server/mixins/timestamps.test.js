'use strict'

const sinon = require('sinon')
const expect = require('chai').expect
const mixin = require('../../../server/mixins/timestamps.js')
const utils = require('../../../server/mixins/utils')

describe('Timestamps Mixin', () => {
  let Model, updateTimestamps

  beforeEach(() => {
    Model = {
      defineProperty: sinon.stub(),
      observe: sinon.stub(),
    }

    updateTimestamps = sinon.stub(utils, 'updateTimestamps')
  })

  afterEach(() => {
    updateTimestamps.restore()
  })

  it('should define a createdAt property', () => {
    mixin(Model)
    expect(Model.defineProperty.calledWith('createdAt', {
      type: Date,
      default: '$now',
    })).to.be.true
  })
  it('should define an updatedAt property', () => {
    mixin(Model)
    expect(Model.defineProperty.calledWith('updatedAt', {
      type: Date,
      default: '$now',
    })).to.be.true
  })
  it('should call to #utils.updateTimestamps on a `before save` hook', () => {
    mixin(Model)
    expect(Model.observe.calledWith('before save', updateTimestamps)).to.be.true
  })
})
