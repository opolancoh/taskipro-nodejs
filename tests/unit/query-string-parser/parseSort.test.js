const expect = require('chai').expect;

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
    }' and type '${typeof item.value}' | result ${JSON.stringify(
      result
    )}`, () => {
      expect(result).to.be.an('object');
      for (const prop in result) {
        expect(result)
          .to.have.a.property(prop)
          .to.be.a('number')
          .to.equal(result[prop]);
      }
    });
  });
});
