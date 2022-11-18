/**
 * @file Configures the 'dotenv' utility.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.1.0
 */

"use strict";

const path = require("node:path");

const { config } = require("dotenv");
const { expand } = require("dotenv-expand");

class Env {
  constructor() {
    this.path = path.join(__dirname, "..", "..", "private", ".env");
    this.debug = false;
    this.encoding = "utf8";
    this.override = false;
  }

  config() {
    return config({
      path: this.path,
      debug: this.debug,
      encoding: this.encoding,
      override: this.override,
    });
  }

  expand(object) {
    return expand(object);
  }
}

module.exports = { Env };
