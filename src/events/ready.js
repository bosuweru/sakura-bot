/**
 * @file Discord.JS 'ready' event.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const { Events } = require("discord.js");
const { logger } = require("../utilities/winston");

const { cacheGameData } = require("../helpers/retroAchievements");
const { cacheConsoleData } = require("../helpers/retroAchievements");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    cacheConsoleData(client.consoleData);
    cacheGameData(client.gameData);

    logger.info(`Client (${client.user.tag}) is ready.`);
  },
};
