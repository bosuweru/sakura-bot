/**
 * @file Initializes the 'interactionCreate' event.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.1.0
 */

"use strict";

const { Log } = require("../utils/winston");
const log = new Log();

const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isAutocomplete())
      return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (interaction.isChatInputCommand()) {
      try {
        await command.execute(interaction);
      } catch (error) {
        log.write("error", error);
      }
    } else if (interaction.isAutocomplete()) {
      try {
        await command.autocomplete(interaction);
      } catch (error) {
        log.write("error", error);
      }
    }
  },
};
