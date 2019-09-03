const paginationData = require('./pagination-data');
const selectData = require('./select-data');
const totalCount = require('../create/valid-data').length;
const { resourceSuffix } = require('../_params');

const baseTest = require('../../_shared/base-find.test');

baseTest.run({
  resourceSuffix,
  paginationData,
  selectData,
  totalCount
});
