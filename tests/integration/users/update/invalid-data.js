const baseInvalidData = require('../../_shared/data/base-invalid-data').getData('UPDATE');

const invalidData = [
  {
    id: '123456',
    body: { name: 'New name!!' },
    code: 400,
    message() {
      return `should not UPDATE an item when 'id' with value '${this.id}' is not valid`;
    }
  },
  {
    id: '',
    body: { name: 'N' },
    code: 400,
    message() {
      return `should not UPDATE an item when 'name' with value '${this.body.name}' is not valid`;
    }
  },
  {
    id: '',
    body: { email: 'new_email' },
    code: 400,
    message() {
      return `should not UPDATE an item when 'email' with value '${this.body.email}' is not valid`;
    }
  },
  {
    id: '',
    body: { email: 'new_email@taskipro' },
    code: 400,
    message() {
      return `should not UPDATE an item when 'email' with value '${this.body.email}' is not valid`;
    }
  },
  {
    id: '',
    body: { password: 'password' },
    code: 400,
    message() {
      return `should not UPDATE an item when 'password' is sent`;
    }
  },
  {
    id: '',
    body: { displayName: 'D' },
    code: 400,
    message() {
      return `should not UPDATE an item when 'displayName' with value '${this.body.displayName}' is not valid`;
    }
  },
  {
    id: '',
    body: { roles: [] },
    code: 400,
    message() {
      return `should not UPDATE an item when 'roles' with value '${JSON.stringify(
        this.body.roles
      )}' is not valid`;
    }
  },
  {
    id: '',
    body: { roles: [''] },
    code: 400,
    message() {
      return `should not UPDATE an item when 'roles' with value '${JSON.stringify(
        this.body.roles
      )}' is not valid`;
    }
  },
  {
    id: '',
    body: { roles: ['rol'] },
    code: 400,
    message() {
      return `should not UPDATE an item when 'roles' with value '${JSON.stringify(
        this.body.roles
      )}' is not valid`;
    }
  },
  {
    id: '5c6e36b17a76dd1f30c17be1',
    body: { name: 'New name 2!!' },
    code: 404,
    message() {
      return `should not UPDATE an item when 'id' with value '${this.id}' is valid but not exists on DB`;
    }
  },
  ...baseInvalidData
];

module.exports = invalidData;
