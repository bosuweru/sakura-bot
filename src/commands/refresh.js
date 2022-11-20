/**
 * @file Initializes the 'refresh' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.2.0
 */

"use strict";

const fs = require("node:fs");

const { id } = require("../../private/configuration/application.json");

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription("Refreshes slash commands."),
  async execute(interaction) {
    const commands = [];
    const commandFiles = fs
      .readdirSync(__dirname)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      await rest.put(Routes.applicationGuildCommands(id.client, id.server), {
        body: commands,
      });

      await interaction.reply({
        content: "Refreshed slash commands.",
        ephemeral: true,
      });
    } catch (error) {
      await interaction.reply({
        content: "Cannot refresh slash commands.",
        ephemeral: true,
      });
    }
  },
};
