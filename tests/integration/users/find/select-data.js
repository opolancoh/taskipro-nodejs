const { schema } = require('../_params');
const { createValidDataForGetSelect } = require('../../_shared//helper');

const validData = [
  {
    query: 'select=name'
  },
  {
    query: 'select=email'
  },
  {
    query: 'select=password'
  },
  {
    query: 'select=displayName'
  },
  {
    query: 'select=roles'
  },
  {
    query: 'select=email,name'
  },
  {
    query: ''
  }
];

createValidDataForGetSelect(schema, validData);

module.exports = validData;
