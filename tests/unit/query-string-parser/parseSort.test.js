const { expect } = require('chai');

const { parseSort } = require('../../../helpers/query-string-parser');

describe('parseSort', () => {
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
      result: { name: 1 }
    },
    {
      value: '-name',
      result: { name: -1 }
    },
    {
      value: 'name,-date',
      result: { name: 1, date: -1 }
    },
    {
      value: '-name,date, ',
      result: { name: -1, date: 1 }
    },
    {
      value: '-name, -date ',
      result: { name: -1, date: -1 }
    },
    {
      value: ',-name, -date ',
      result: { name: -1, date: -1 }
    },
    {
      value: ',-name,, -date ,,',
      result: { name: -1, date: -1 }
    }
  ].forEach(item => {
    const result = parseSort(item.value);

    it(`should return ${JSON.stringify(item.result)} for value '${
      item.value
    }' and type '${typeof item.value}' | result ${JSON.stringify(result)}`, () => {
      expect(result).to.be.an('object');
      Object.keys(result).forEach(key => {
        expect(result)
          .to.have.a.property(key)
          .to.be.a('number')
          .to.equal(result[key]);
      });
    });
  });
});
