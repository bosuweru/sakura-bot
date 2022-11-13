"use strict";

const path = require("node:path");

const dotenv = require("dotenv");
const plugin = require("dotenv-expand");

const object = dotenv.config({
  path: path.join(__dirname, "..", "..", "private", ".env"),
  debug: false,
  encoding: "utf8",
  override: false,
});

const result = plugin.expand(object);

module.exports = { result };
