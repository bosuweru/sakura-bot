/**
 * @file Initializes the 'retroAchievements' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.3.0
 */

"use strict";

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const {
  getGameOptions,
  getConsoleOptions,
  fetchGameInformation,
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
    const c = interaction.options.getString("console");
    const g = interaction.options.getString("game");

    const game = await fetchGameInformation(
      c,
      g,
      interaction.client.retroAchievements
    );

    const message = new EmbedBuilder()
      .setColor("#FFFF00")
      .setImage(`https://media.retroachievements.org${game.ImageIngame}`)
      .setAuthor({
        name: game.GameTitle,
        iconURL: `https://media.retroachievements.org${game.GameIcon}`,
        url: `https://retroachievements.org/game/${game.ID}`,
      })
      .addFields(
        {
          name: "Genre",
          value: `${game.Genre}`,
          inline: true,
        },
        {
          name: "Console",
          value: `${game.ConsoleName}`,
          inline: true,
        },
        {
          name: "Released",
          value: `${game.Released}`,
          inline: true,
        }
      )
      .setThumbnail(`https://media.retroachievements.org${game.ImageBoxArt}`)
      .setTimestamp();

    await interaction.reply({ embeds: [message] });
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
