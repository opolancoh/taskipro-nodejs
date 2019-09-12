// const logger = require('../helpers/logger.helper');
// const logService = require('../api/modules/log/log-service');
const { rc500 } = require('./base-response');

/* const logToDb = async item => {
  try {
    const result = await logService.create(item);
    if (result.code !== 201) {
      logger.error(`#LogToDbError ${item.description}`);
    }
  } catch (ex) {
    console.log('#LogToDbException', ex);
    logger.error(`#LogToDbException ${ex}`);
    logger.error(item.description);
  }
}; */

const customErrorHandler = (err, level) => {
  const errorLevel = level || 'error';
  const errorDescription = `${err.stack}`;
  const item = {
    level: errorLevel,
    timestamp: new Date(),
    description: errorDescription
  };
  console.log('');
  console.log(item);
  // logger.log(errorLevel, errorDescription);
  // logToDb(item);
};

const errorHandler = (err, req, res) => {
  customErrorHandler(err);
  const bodyResponse = { ...rc500 };
  if (err.status && err.status !== 500) {
    bodyResponse.code = err.status || 500;
    bodyResponse.message = err.message;
  }
  res.status(200).send(bodyResponse);
};

module.exports = { errorHandler, customErrorHandler };
