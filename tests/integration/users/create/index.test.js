const validData = require('./valid-data');
const invalidData = require('./invalid-data');
const { resourceSuffix } = require('../_params');

const baseTest = require('../../_shared/base-create.test');

baseTest.run({ resourceSuffix, validData, invalidData, propName: 'name' });
