/**
 * @file Initializes the 'remove' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.2.0
 */

"use strict";

const { id } = require("../../private/configuration/application.json");

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Removes a slash command.")
    .addStringOption((option) =>
      option
        .setName("id")
        .setRequired(true)
        .setDescription("The slash command identifier.")
    ),
  async execute(interaction) {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    const command = interaction.options.getString("id");

    try {
      if (command === id.command.remove || command === id.command.refresh) {
        await interaction.reply({
          content: "This slash command cannot be deleted.",
          ephemeral: true,
        });
      } else {
        await rest.delete(
          Routes.applicationGuildCommand(id.client, id.server, command)
        );

        await interaction.reply({
          content: "Deleted slash command.",
          ephemeral: true,
        });
      }
    } catch (error) {
      await interaction.reply({
        content: "Cannot delete slash command.",
        ephemeral: true,
      });
    }
  },
};
