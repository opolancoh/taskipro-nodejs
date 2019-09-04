const { randomString } = require('../../_shared/helper');
const baseInvalidData = require('../../_shared/data/base-invalid-data').getData('CREATE');

const invalidData = [
  {
    body: {
      email: 'user400@taskipro.com',
      password: 'User400Pa$$',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'name' is missing`;
    }
  },
  {
    body: {
      name: 'User 400',
      password: 'User400Pa$$',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'email' is missing`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@taskipro.com',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'password' is missing`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@taskipro.com',
      password: 'User400Pa$$'
    },
    code: 400,
    message: () => {
      return `should NOT CREATE a record if 'roles' are missing`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@taskipro.com',
      password: 'User400Pa$$',
      roles: ['rol']
    },
    code: 400,
    message: () => {
      return `should NOT CREATE a record if 'roles' are invalid`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@taskipro.com',
      password: 'User400Pa$$',
      roles: ['user', 'rol']
    },
    code: 400,
    message: () => {
      return `should NOT CREATE a record if 'roles' are invalid`;
    }
  },
  {
    body: {
      name: 'U',
      email: 'user400@ikobitcom',
      password: 'User400Pa$$',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'name' length is less than the minimum`;
    }
  },
  {
    body: {
      name: randomString(280),
      email: 'user400@ikobitcom',
      password: 'User400Pa$$',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if NAME length is greater than the maximum`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@ikobitcom',
      password: 'User400Pa$$',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'email' is not valid`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400ikobit.com',
      password: 'User400Pa$$',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'email' is not valid`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@ikobitcom',
      password: 'User400Pa$$',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'email' is not valid`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: `${randomString(300)}@taskipro.com`,
      password: 'User400Pa$$',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'email' length is greater than the maximum`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@ikobitcom',
      password: '123',
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'password' length is less than the minimum`;
    }
  },
  {
    body: {
      name: 'User 400',
      email: 'user400@taskipro.com',
      password: randomString(256),
      roles: ['user']
    },
    code: 400,
    message: () => {
      return `should not CREATE a record if 'password' length is greater than the maximum`;
    }
  },
  {
    body: {
      name: 'User 1',
      email: 'user1@taskipro.com',
      password: 'User1Pa$$',
      roles: ['user']
    },
    code: 409,
    message: () => {
      return `should not CREATE a duplicated record`;
    }
  },
  ...baseInvalidData
];

module.exports = invalidData;
