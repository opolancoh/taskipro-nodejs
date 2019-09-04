const { expect } = require('chai');
const config = require('config');

const { parseLimit } = require('../../../helpers/query-string-parser');

const limitDefault = config.get('app.items.limit');
const limitMax = config.get('app.items.limitMax');

describe('parseLimit', () => {
  [
    {
      value: undefined,
      result: limitDefault
    },
    {
      value: '',
      result: limitDefault
    },
    {
      value: '-1',
      result: limitDefault
    },
    {
      value: '0',
      result: limitDefault
    },
    {
      value: '1',
      result: 1
    },
    {
      value: '1000',
      result: limitMax
    }
  ].forEach(item => {
    it(`should return ${item.result} for value {${
      item.value
    }} and type {${typeof item.value}}`, () => {
      const result = parseLimit(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
