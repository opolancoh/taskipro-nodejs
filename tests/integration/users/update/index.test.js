const validData = require('./valid-data');
const invalidData = require('./invalid-data');
const { resourceSuffix } = require('../_params');

const baseTest = require('../../_shared/base-update.test');

baseTest.run({ resourceSuffix, validData, invalidData });
