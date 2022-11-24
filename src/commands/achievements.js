/**
 * @file Initializes the 'achievements' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.2.0
 */

"use strict";

const axios = require("axios");

const { RA } = require("../../private/configuration/application.json");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("achievements")
    .setDescription("Retrieves RetroAchievements information.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("game")
        .setDescription("Retrieves RetroAchievements game information.")
        .addStringOption((option) =>
          option
            .setName("title")
            .addChoices(
              { name: "Battle Heat", value: "13339" },
              { name: "Chip-chan Kick!", value: "9961" },
              { name: "Choujin Heiki Zeroigar", value: "9940" },
              { name: "Farland Story FX", value: "8112" },
              { name: "Kishin Douji Zenki FX: Vajura Fight", value: "9525" },
              { name: "Last Imperial Prince", value: "9373" },
              { name: "Power Dolls FX", value: "16454" },
              { name: "Shanghai: Banri no Choujou", value: "16458" }
            )
            .setRequired(true)
            .setDescription("The pre-defined game title value.")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Retrieves RetroAchievements user information.")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "game") {
      const key = `key=${RA.API}`;
      const game = `game=${interaction.options.getString("title")}`;
      const mode = "mode=json";
      const user = `user=${RA.USR}`;

      const addr = `https://ra.hfc-essentials.com/game_info.php?${user}&${key}&${game}&${mode}`;
      const resp = await axios.get(addr);

      const message = new EmbedBuilder()
        .setColor("#FFFF00")
        .setImage(`https://media.retroachievements.org${resp.data.ImageIngame}`)
        .setAuthor({
          name: resp.data.GameTitle,
          iconURL: `https://media.retroachievements.org${resp.data.GameIcon}`,
          url: `https://retroachievements.org/game/${resp.data.ID}`,
        })
        .addFields(
          {
            name: "Genre",
            value: `${resp.data.Genre}`,
            inline: true,
          },
          {
            name: "Console",
            value: `${resp.data.ConsoleName}`,
            inline: true,
          },
          {
            name: "Released",
            value: `${resp.data.Released}`,
            inline: true,
          }
        )
        .setThumbnail(
          `https://media.retroachievements.org${resp.data.ImageBoxArt}`
        )
        .setTimestamp();

      await interaction.reply({ embeds: [message] });
    }

    if (interaction.options.getSubcommand() === "user") {
      await interaction.reply({
        content: "This command is under development.",
        ephemeral: true,
      });
    }
  },
};
