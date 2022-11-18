/**
 * @file Initializes the 'ready' event.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.1.0
 */

"use strict";

const { Log } = require("../utils/winston");
const log = new Log();

const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    log.write("info", `${client.user.tag} ready.`);
  },
};
