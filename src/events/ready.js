/**
 * @file Discord.JS 'ready' event.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const { Events } = require("discord.js");
const { logger } = require("../utilities/winston");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    logger.info(`Client (${client.user.tag}) is ready.`);
  },
};
