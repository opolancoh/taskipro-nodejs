const expect = require('chai').expect;

const {
  isIntegerGreaterOrEqualThanZero
} = require('../../../helpers/validation-helper');

describe('isIntegerGreaterOrEqualThanZero', () => {
  [
    {
      value: '',
      result: false
    },
    {
      value: '1',
      result: true
    },
    {
      value: 1,
      result: true
    },
    {
      value: '0',
      result: true
    },
    {
      value: 0,
      result: true
    },
    {
      value: -1,
      result: false
    },
    {
      value: 456,
      result: true
    }
  ].forEach(item => {
    it(`should return ${item.result} for value {${
      item.value
    }} and type {${typeof item.value}}`, () => {
      const result = isIntegerGreaterOrEqualThanZero(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
