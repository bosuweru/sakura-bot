/**
 * @file Configuration of the 'winston' logging utility.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const winston = require("winston");

const level = process.env.NODE_ENV === "development" ? "debug" : "info";
const levels = winston.config.npm.levels;
const transports = [];

if (process.env.NODE_ENV === "development") {
  const Console = new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.printf((info) => {
        return `${info.timestamp} [${info.level}] ${info.message}`;
      })
    ),
  });

  transports.push(Console);
}

const logger = winston.createLogger({
  level: level,
  levels: levels,
  transports: transports,
});

module.exports = { logger };
