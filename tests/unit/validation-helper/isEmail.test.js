const { expect } = require('chai');

const { isEmail } = require('../../../helpers/validation-helper');

describe('isEmail', () => {
  [
    {
      value: 'oscar.polanco@ikobit.com',
      result: true
    },
    {
      value: 'oscar.polanco@ikobit.com.co',
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
      value: 'mysite.ourearth.com',
      result: false
    },
    {
      value: 'mysite@.com.my',
      result: false
    },
    {
      value: '@you.me.net',
      result: false
    },
    {
      value: 'mysite123@gmail.b',
      result: false
    },
    {
      value: 'mysite@.org.org',
      result: false
    },
    {
      value: '.mysite@mysite.org',
      result: false
    },
    {
      value: 'mysite()*@gmail.com',
      result: false
    },
    {
      value: 'mysite..1234@yahoo.com',
      result: false
    }
  ].forEach(item => {
    it(`should return ${item.result} for value {${
      item.value
    }} and type {${typeof item.value}}`, () => {
      const result = isEmail(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
