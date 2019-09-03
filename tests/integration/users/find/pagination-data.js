const baseGetPaginationData = require('../../_shared/data/base-find-pagination-data');
const totalCount = require('../create/valid-data').length;

const data = baseGetPaginationData.getData(totalCount);

module.exports = data;
