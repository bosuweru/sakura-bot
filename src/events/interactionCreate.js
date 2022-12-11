/**
 * @file Discord.JS 'interactionCreate' event.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const { Events } = require("discord.js");
const { logger } = require("../utilities/winston");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction) {
    try {
      if (!interaction.isChatInputCommand() && !interaction.isAutocomplete())
        return;

      const command = interaction.client.commands.get(interaction.commandName);

      if (interaction.isAutocomplete()) {
        await command.autocomplete(interaction);
      } else {
        await command.execute(interaction);
      }
    } catch (error) {
      logger.error(error.stack);
    }
  },
};
