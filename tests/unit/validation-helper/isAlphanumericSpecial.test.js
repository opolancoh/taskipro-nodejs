const expect = require('chai').expect;

const { isAlphanumericSpecial } = require('../../../helpers/validation-helper');

describe('isAlphanumericSpecial', () => {
  [
    {
      value:
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -_',
      result: true
    },
    {
      value: undefined,
      result: false
    },
    {
      value: '',
      result: false
    },
    {
      value: '.~:/?#[]@!$&()*+,;=|{}%!`',
      result: false
    }
  ].forEach(item => {
    it(`should return ${item.result} for value {${
      item.value
    }} and type {${typeof item.value}}`, () => {
      const result = isAlphanumericSpecial(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
