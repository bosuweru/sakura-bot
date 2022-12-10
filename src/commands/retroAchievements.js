/**
 * @file Initializes the 'retroAchievements' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.3.0
 */

"use strict";

const { SlashCommandBuilder } = require("discord.js");

const {
  getGameOptions,
  getConsoleOptions,
} = require("../helpers/retroAchievements");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("retroachievements")
    .setDescription("Retrieves RetroAchievements information.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("Retrieves RetroAchievements game information.")
        .addStringOption((option) =>
          option
            .setName("console")
            .setRequired(true)
            .setDescription("The pre-defined console value.")
            .setAutocomplete(true)
        )
        .addStringOption((option) =>
          option
            .setName("game")
            .setRequired(true)
            .setDescription("The pre-defined game title value.")
            .setAutocomplete(true)
        )
    ),
  async execute(interaction) {
    // TODO: To be continued...
  },
  async autocomplete(interaction) {
    let options;
    const focused = interaction.options.getFocused(true);

    if (focused.name === "console") {
      options = getConsoleOptions(interaction.client.retroAchievements);
    } else if (focused.name === "game") {
      options = getGameOptions(
        interaction.client.retroAchievements,
        interaction.options.getString("console")
      );
    }

    const filtered = options.filter((option) =>
      option.startsWith(focused.value)
    );

    let selection;
    if (filtered.length > 5) {
      selection = filtered.slice(0, 5);
    } else {
      selection = filtered;
    }

    await interaction.respond(
      selection.map((option) => ({ name: option, value: option }))
    );
  },
};
