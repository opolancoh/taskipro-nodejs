const config = require('config');

const { createValidDataForGetPagination } = require('../helper');

const defaultRowLimit = config.get('app.items.limit');
const defaultMaxRowLimit = config.get('app.items.limitMax');

exports.getData = totalCount => {
  const data = [
    {
      query: 'limit=2&offset=0',
      limit: 2,
      offset: 0
    },
    {
      query: '',
      limit: defaultRowLimit,
      offset: 0
    },
    {
      query: 'limit=0&offset=0',
      limit: defaultRowLimit,
      offset: 0
    },
    {
      query: 'limit=-1&offset=-2',
      limit: defaultRowLimit,
      offset: 0
    },
    {
      query: 'limit=a&offset=b',
      limit: defaultRowLimit,
      offset: 0
    },
    {
      query: 'limit=10000',
      limit: defaultMaxRowLimit,
      offset: 0
    },
    {
      query: 'limit=9&offset=100',
      limit: 9,
      offset: 100
    }
  ];

  createValidDataForGetPagination(data, totalCount, defaultMaxRowLimit);

  return data;
};
