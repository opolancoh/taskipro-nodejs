const expect = require('chai').expect;

const { csvToArray } = require('../../../helpers/format-helper');

describe('csvToArray', () => {
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
      value: 'name,date',
      result: ['name', 'date']
    },
    {
      value: ',name,,date,',
      result: ['name', 'date']
    }
  ].forEach(item => {
    const result = csvToArray(item.value);

    it(`should return ${JSON.stringify(item.result)} for value '${
      item.value
    }' and type '${typeof item.value}' | result ${JSON.stringify(
      result
    )}`, () => {
      expect(result).to.eql(item.result);
    });
  });
});
