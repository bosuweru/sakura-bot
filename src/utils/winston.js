/**
 * @file Configures the 'winston' utility.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.1.0
 */

"use strict";

const winston = require("winston");

const console = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({}),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
});

class Log {
  constructor() {
    this.level = process.env.DEBUG ? "debug" : "info";
    this.transports = [];

    if (process.env.NODE_ENV === "development") this.transports.push(console);

    this.logger = winston.createLogger({
      level: this.level,
      transports: this.transports,
    });
  }

  write(level, message) {
    switch (level) {
      case "error":
        this.logger.error(message);
        break;
      case "warn":
        this.logger.warn(message);
        break;
      case "info":
        this.logger.info(message);
        break;
      case "http":
        this.logger.http(message);
        break;
      case "verbose":
        this.logger.verbose(message);
        break;
      case "debug":
        this.logger.debug(message);
        break;
      case "silly":
        this.logger.silly(message);
        break;
      default:
        break;
    }
  }
}

module.exports = { Log };
