/**
 * @file Initializes the 'ping' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.1.0
 */

"use strict";

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Checks latency."),
  async execute(interaction) {
    const sent = await interaction.reply({
      content: "Pinging...",
      fetchReply: true,
    });
    interaction.editReply(
      `Roundtrip Latency: ${
        sent.createdTimestamp - interaction.createdTimestamp
      }ms`
    );
  },
};
