'use strict';

const winston = require('winston');


const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.simple(),
  winston.format.printf((info) => {
    return `[${info.level.toUpperCase().padEnd(7)}]: ${info.timestamp} -- ${info.message}`
  })
);
//
// Logging levels
//
const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow'
  }
};

winston.addColors(config.colors);

const logger = module.exports = winston.createLogger({
  format: customFormat,
  levels: config.levels,
  transports: [
    new winston.transports.Console()
  ],
  level: 'custom'
});

