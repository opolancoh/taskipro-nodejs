const { schema } = require('../_params');
const { createValidDataForPost } = require('../../_shared/helper');

const validData = [
  {
    body: {
      // This item must have all body from schema
      name: 'User 1 Ikobit',
      email: 'user1@taskipro.com',
      password: 'User1Pa$$',
      displayName: 'User 1',
      roles: ['user']
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'User 5 Admin',
      email: 'admin@taskipro.com',
      password: 'AdminPa$$',
      displayName: 'Admin',
      roles: ['admin', 'user']
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'User 2',
      email: 'user2@taskipro.com',
      password: 'User2Pa$$',
      roles: ['user']
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'User 3',
      email: 'user3@taskipro.com',
      password: 'User3Pa$$',
      roles: ['user']
    },
    nonRetornableFields: []
  },
  {
    body: {
      name: 'User 4',
      email: 'user4@taskipro.com',
      password: 'User4Pa$$',
      roles: ['user']
    },
    nonRetornableFields: []
  }
];

// set nonNetornableFields
createValidDataForPost(schema, validData);

module.exports = validData;
