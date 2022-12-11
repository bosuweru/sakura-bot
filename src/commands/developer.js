/**
 * @file Executes the 'developer' slash command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const fs = require("node:fs");

const { REST, Routes } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

async function refresh(client, guild) {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  const body = [];
  const bodyFiles = fs
    .readdirSync(__dirname)
    .filter((file) => file.endsWith(".js"));

  for (const file of bodyFiles) {
    const command = require(`./${file}`);
    body.push(command.data.toJSON());
  }

  await rest.put(Routes.applicationGuildCommands(client, guild), {
    body: body,
  });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("developer")
    .setDescription("Executes developer interactions.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("refresh")
        .setDescription("Refreshes all interactions.")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "refresh") {
      const guild = interaction.guildId;
      const client = interaction.client.user.id;

      await refresh(client, guild);

      await interaction.reply({
        content: "All interactions have been refreshed. :tada:",
        ephemeral: true,
      });
    }
  },
};
