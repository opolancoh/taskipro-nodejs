const { expect } = require('chai');

const { parseOffset } = require('../../../helpers/query-string-parser');

describe('parseOffset', () => {
  [
    {
      value: undefined,
      result: 0
    },
    {
      value: '',
      result: 0
    },
    {
      value: '-1',
      result: 0
    },
    {
      value: '0',
      result: 0
    },
    {
      value: '1',
      result: 1
    },
    {
      value: '1000',
      result: 1000
    }
  ].forEach(item => {
    it(`should return ${item.result} for value {${
      item.value
    }} and type {${typeof item.value}}`, () => {
      const result = parseOffset(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
