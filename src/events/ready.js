"use strict";

const { Events } = require("discord.js");
const { logger } = require("../utils/winston");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    logger.info(`Logged in as ${client.user.tag}!`);
  },
};
