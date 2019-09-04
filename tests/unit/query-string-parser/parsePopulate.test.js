const { expect } = require('chai');

const { parsePopulate } = require('../../../helpers/query-string-parser');

describe('parsePopulate', () => {
  [
    {
      value: undefined,
      result: []
    },
    {
      value: '',
      result: []
    },
    {
      value: 'name',
      result: []
    },
    {
      value: 'name|',
      result: []
    },
    {
      value: 'name:',
      result: []
    },
    {
      value: 'category:name,updatedAt|account:name',
      result: [{ path: 'category', select: 'name updatedAt' }, { path: 'account', select: 'name' }]
    },
    {
      value: 'category:|name,updatedAt|account:name',
      result: [{ path: 'account', select: 'name' }]
    },
    {
      value: 'category:name,updatedAt|account|:name',
      result: [{ path: 'category', select: 'name updatedAt' }]
    },
    {
      value: 'account:,name',
      result: [{ path: 'account', select: 'name' }]
    }
  ].forEach(item => {
    const result = parsePopulate(item.value);
    it(`should return ${JSON.stringify(item.result)} for value '${
      item.value
    }' and type '${typeof item.value}' | result ${JSON.stringify(result)}`, () => {
      expect(result).to.have.deep.members(item.result);
    });
  });
});
