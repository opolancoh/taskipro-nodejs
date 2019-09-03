const baseInvalidData = require('./base-invalid-id-data').getData('DELETE');

const validData = [
  {
    message: `Code 200: should DELETE an item given the id`
  }
];

const invalidData = [...baseInvalidData];

module.exports = {
  validData,
  invalidData
};
