const { expect } = require('chai');

const { parseFilter } = require('../../../helpers/query-string-parser');

describe('parseFilter', () => {
  [
    {
      value: undefined,
      result: {}
    },
    {
      value: '',
      result: {}
    },
    {
      value: 'name',
      result: {}
    },
    {
      value: 'name,date',
      result: {}
    },
    {
      value: 'name:in',
      result: { name: /in/i }
    },
    {
      value: 'name:|in',
      result: {}
    },
    {
      value: 'name|:in',
      result: {}
    },
    {
      value: 'name:in|description:descr',
      result: { name: /in/i, description: /descr/i }
    },
    {
      value: '||name:in||description:descr|',
      result: { name: /in/i, description: /descr/i }
    },
    {
      value: 'name:|in|description:descr',
      result: { description: /descr/i }
    }
  ].forEach(item => {
    const result = parseFilter(item.value);

    it(`should return ${JSON.stringify(item.result)} for value '${
      item.value
    }' and type '${typeof item.value}' | result ${JSON.stringify(result)}`, () => {
      expect(result).to.eql(item.result);
    });
  });
});
