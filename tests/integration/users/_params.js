const baseSchema = require('../_shared/base-schema');

exports.resourceSuffix = '/users';

exports.schema = [
  {
    name: 'name',
    type: 'string'
  },
  {
    name: 'email',
    type: 'string'
  },
  {
    name: 'password',
    type: 'string'
  },
  {
    name: 'displayName',
    type: 'string'
  },
  {
    name: 'roles',
    type: 'array'
  },
  ...baseSchema
];
