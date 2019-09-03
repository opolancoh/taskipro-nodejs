const { validData, invalidData } = require('./find-by-id-data');
const { resourceSuffix } = require('../_params');

const baseTest = require('../../_shared/base-find-by-id.test');

baseTest.run({
  resourceSuffix,
  validData,
  invalidData,
  authToken: global.authToken
});
