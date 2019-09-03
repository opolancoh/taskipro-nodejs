const expect = require('chai').expect;

const { parseSelect } = require('../../../helpers/query-string-parser');

describe('parseSelect', () => {
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
      result: ['name']
    },
    {
      value: ' name ',
      result: ['name']
    },
    {
      value: ' name , date ',
      result: ['name', 'date']
    },
    {
      value: ',,name,date, ,id,,',
      result: ['name', 'date', 'id']
    }
  ].forEach(item => {
    const result = parseSelect(item.value);
    it(`should return ${JSON.stringify(item.result)} for value '${
      item.value
    }' and type '${typeof item.value}' | result ${JSON.stringify(
      result
    )}`, () => {
      expect(result).to.have.members(item.result);
    });
  });
});
