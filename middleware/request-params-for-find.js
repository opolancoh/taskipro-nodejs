const {
  parseLimit,
  parseOffset,
  parseSort,
  parseSelect,
  parseFilter,
  parsePopulate
} = require('../helpers/query-string-parser');

function requestParamsForFind(req, res, next) {
  const params = {};
  params.limit = parseLimit(req.query.limit);
  params.offset = parseOffset(req.query.offset);
  params.sort = parseSort(req.query.sort);
  params.select = parseSelect(req.query.select);
  params.filter = parseFilter(req.query.filter);
  params.populate = parsePopulate(req.query.populate);

  // enable to return the totalCount metadata
  if (req.headers['x-request-total-count'] === 'true') {
    params.setTotalCount = true;
  }

  req.query.paramsForFind = params;
  next();
}

module.exports = requestParamsForFind;
