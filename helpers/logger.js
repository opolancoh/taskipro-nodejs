/*
0: error
1: warn
2: info
3: verbose
4: debug
5: silly
*/

const { createLogger, format, transports } = require('winston');
const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const filename = path.join(logDir, 'app.log');

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(info => `${info.level} ${info.timestamp} ${info.message}`)
      )
    }),
    new transports.File({
      format: format.combine(
        format.timestamp(),
        format.printf(info => `${info.level}\t${info.timestamp}\t${info.message}`)
      ),
      filename
    })
  ]
});

module.exports = logger;
