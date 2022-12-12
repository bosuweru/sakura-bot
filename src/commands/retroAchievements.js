/**
 * @file Executes the 'retroAchievements' slash command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("achievements")
    .setDescription("Executes RetroAchievements interactions.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("search")
        .setDescription("Retrieves game information.")
        .addStringOption((option) =>
          option
            .setName("platform")
            .setRequired(true)
            .setDescription("The platform name of the game.")
            .setAutocomplete(true)
        )
    ),
  async execute(interaction) {
    await interaction.reply({
      content: "This interaction is currently under development.",
      ephemeral: true,
    });
  },
  async autocomplete(interaction) {
    let options;
    let reduced;

    const focused = interaction.options.getFocused(true);

    if (focused.name === "platform") {
      options = Array.from(interaction.client.consoleData.keys());
    }

    const filtered = options.filter((option) =>
      option.startsWith(focused.value)
    );

    if (filtered.length > 25) {
      reduced = filtered.slice(0, 25);
    } else {
      reduced = filtered;
    }

    // eslint-disable-next-line prettier/prettier
    await interaction.respond(reduced.map((option) => ({ name: option, value: option })));
  },
};
