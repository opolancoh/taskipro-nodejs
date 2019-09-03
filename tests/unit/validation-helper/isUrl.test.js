const expect = require('chai').expect;

const { isUrl } = require('../../../helpers/validation-helper');

/*
  In general URIs as defined by RFC 3986 may contain any of the following characters:
  ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=
  Any other character needs to be encoded with the percent-encoding (%hh). Each part of the URI has further restrictions about what characters need to be represented by an percent-encoded word.
*/

describe('isUrl', () => {
  [
    {
      value: 'https://www.example.com',
      result: true
    },
    {
      value: 'http://www.example.com',
      result: true
    },
    {
      value: 'www.example.com',
      result: true
    },
    {
      value: 'example.com',
      result: true
    },
    {
      value: 'http://example.com',
      result: true
    },
    {
      value: 'https://example.com',
      result: true
    },
    {
      value: 'http://blog.example.com',
      result: true
    },
    {
      value: 'http://www.example.com/product',
      result: true
    },
    {
      value: 'http://www.example.com/products?id=1&page=2',
      result: true
    },
    {
      value: 'http://www.example.com#up',
      result: true
    },
    {
      value: 'http://255.255.255.255',
      result: true
    },
    {
      value: '255.255.255.255',
      result: true
    },
    {
      value: 'http://www.site.com:8008',
      result: true
    },
    {
      value: 'http://example.com:8081',
      result: true
    },
    {
      value: 'https://example.com:8081',
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
      value: 'localhost',
      result: false
    },
    {
      value: 'httpa://www.example.com',
      result: false
    },
    {
      value: 'http://3628126748',
      result: false
    },
    {
      value: 'http://foo.bar/foo(bar)baz quux',
      result: false
    },
    {
      value: 'http:// shouldfail.com',
      result: false
    },
    {
      value: 'h://test',
      result: false
    },
    {
      value: 'http:///a',
      result: false
    },
    {
      value: '//a',
      result: false
    },
    {
      value: '//',
      result: false
    },
    {
      value: 'http://?',
      result: false
    },
    {
      value: 'http://../',
      result: false
    },
    {
      value: 'http://..',
      result: false
    },
    {
      value: 'http://.',
      result: false
    },
    {
      value: 'http://',
      result: false
    }
  ].forEach(item => {
    it(`should return ${item.result} for value {${
      item.value
    }} and type {${typeof item.value}}`, () => {
      const result = isUrl(item.value);
      expect(result).to.equal(item.result);
    });
  });
});
