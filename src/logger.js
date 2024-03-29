// eslint-disable global-require
const fs = require('fs');
const path = require('path');
const winston = require('winston');
const WinstonRotateFile = require('winston-daily-rotate-file');

const logDirectory = '../logs';
const logFilename = path.resolve(logDirectory, `${logDirectory}/-logfile.log`);
const timestampFormat = () => new Date().toLocaleTimeString();
const prettyprintFormat = obj => JSON.stringify(obj, null, 2);

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      timestamp: timestampFormat,
      colorize: true,
      level: 'debug',
      prettyPrint: prettyprintFormat,
    }),
    new WinstonRotateFile({
      filename: logFilename,
      timestamp: timestampFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: 'info',
      json: false,
      prettyprint: prettyprintFormat,
    }),
  ],
});

logger.stream = {
  /* eslint-disable no-unused-vars */
  write: (message, encoding) => {
    // logger.info(message);
  },
};

module.exports = logger;
