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
            .setName("console")
            .setRequired(true)
            .setDescription("The pre-defined console value.")
            .setAutocomplete(true)
        )
        .addStringOption((option) =>
          option
            .setName("title")
            .setRequired(true)
            .setDescription("The pre-defined game title value.")
            .setAutocomplete(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("user")
        .setDescription("Retrieves RetroAchievements user information.")
    ),
  async autocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);

    let choices;

    if (focusedOption.name === "console") {
      choices = ["PC-FX", "Nintendo 64"];
    }

    if (focusedOption.name === "title") {
      const console = interaction.options.getString("console");

      if (console === "PC-FX") {
        choices = ["Battle Heat"];
      } else if (console === "Nintendo 64") {
        choices = ["Super Smash Bros."];
      } else {
        choices = [];
      }
    }

    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedOption.value)
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  },
  async execute(interaction) {
    let game;

    if (interaction.options.getSubcommand() === "game") {
      if (interaction.options.getString("title") === "Battle Heat") {
        game = `game=${13339}`;
      } else if (
        interaction.options.getString("title") === "Super Smash Bros."
      ) {
        game = `game=${10082}`;
      }

      const key = `key=${RA.API}`;
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
