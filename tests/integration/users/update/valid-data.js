const { schema } = require('../_params');
const { createValidDataForPut } = require('../../_shared//helper');

const validData = [
  {
    body: {
      name: 'New Name'
    },
    message: function() {
      return `should UPDATE an item changing 'name' to '${this.body.name}'`;
    }
  },
  {
    body: {
      email: 'new_email@ikobit.com'
    },
    message: function() {
      return `should UPDATE an item changing the 'email' to '${this.body.email}'`;
    }
  },
  {
    body: {
      displayName: 'New Display Name'
    },
    message: function() {
      return `should UPDATE an item changing the 'displayName' to '${this.body.displayName}'`;
    }
  },
  {
    body: {
      roles: ['admin']
    },
    message: function() {
      return `should UPDATE an item changing the 'roles' to '${JSON.stringify(
        this.body.roles
      )}'`;
    }
  },
  {
    body: {
      roles: ['admin', 'user']
    },
    message: function() {
      return `should UPDATE an item changing the 'roles' to '${JSON.stringify(
        this.body.roles
      )}'`;
    }
  }
];

createValidDataForPut(schema, validData);

module.exports = validData;
