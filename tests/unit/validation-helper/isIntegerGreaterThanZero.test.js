const expect = require('chai').expect;

const {
  isIntegerGreaterThanZero
} = require('../../../helpers/validation-helper');

describe('isIntegerGreaterThanZero', () => {
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
      result: false
    },
    {
      value: 0,
      result: false
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
      const result = isIntegerGreaterThanZero(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
