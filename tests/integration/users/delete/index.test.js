const { validData, invalidData } = require('./data');
const { resourceSuffix } = require('../_params');

const baseTest = require('../../_shared/base-delete.test');

baseTest.run({ resourceSuffix, validData, invalidData });
