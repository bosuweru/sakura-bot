/**
 * @file Initializes the 'achievements' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.2.0
 */

"use strict";

const { api } = require("../../private/configuration/application.json");

const axios = require("axios");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("achievements")
    .setDescription("Checks RetroAchievements information.")
    .addSubcommand((command) =>
      command
        .setName("game")
        .setDescription("Look up information about a game.")
    ),
  async execute(interaction) {
    const user = api.retroachievements.user;
    const token = api.retroachievements.token;
    const address = `https://ra.hfc-essentials.com/game_info.php?user=${user}&key=${token}&game=3&mode=json`;

    const response = await axios.get(address);
    const message = new EmbedBuilder()
      .setColor("#FFFF00")
      .setTitle(response.data.Title)
      .setDescription("Test.");

    await interaction.reply({
      embeds: [message],
      ephemeral: true,
    });
  },
};
