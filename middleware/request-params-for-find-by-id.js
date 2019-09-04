const { parseSelect, parsePopulate } = require('../helpers/query-string-parser');

function requestParamsForFindById(req, res, next) {
  const params = {};
  params.select = parseSelect(req.query.select);
  params.populate = parsePopulate(req.query.populate);

  req.query.paramsForFindById = params;
  next();
}

module.exports = requestParamsForFindById;
