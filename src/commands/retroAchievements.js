/**
 * @file Executes the 'retroAchievements' slash command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

const {
  getGameId,
  getGameList,
  getImageIcon,
  getConsoleList,
} = require("../helpers/retroAchievements");

function messageEmbed(ID, Title, ImageIcon) {
  return new EmbedBuilder()
    .setColor("#FFFF00")
    .setAuthor({
      url: `https://retroachievements.org/game/${ID}`,
      name: `${Title}`,
    })
    .setThumbnail(`https://media.retroachievements.org${ImageIcon}`)
    .setTimestamp();
}

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
            .setDescription("The platform name.")
            .setAutocomplete(true)
        )
        .addStringOption((option) =>
          option
            .setName("title")
            .setRequired(true)
            .setDescription("The title name.")
            .setAutocomplete(true)
        )
    ),
  async execute(interaction) {
    const title = interaction.options.getString("title");
    const platform = interaction.options.getString("platform");

    const id = getGameId(interaction.client.gameData, platform, title);
    const icon = getImageIcon(interaction.client.gameData, platform, title);

    const message = messageEmbed(id, title, icon);

    await interaction.reply({ embeds: [message] });
  },
  async autocomplete(interaction) {
    let options;
    let reduced;

    const focused = interaction.options.getFocused(true);

    if (focused.name === "platform") {
      options = getConsoleList(interaction.client.consoleData);
    } else if (focused.name === "title") {
      // eslint-disable-next-line prettier/prettier
      options = getGameList(interaction.options.getString("platform"), interaction.client.gameData);
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
