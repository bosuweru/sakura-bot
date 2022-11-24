/**
 * @file Initializes the 'administrator' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.2.0
 */

"use strict";

const fs = require("node:fs");

const {
  REST,
  Routes,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("administrator")
    .setDescription("Executes administrative interactions.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("delete")
        .setDescription("Deletes slash commands for the application.")
        .addStringOption((option) =>
          option
            .setName("command")
            .setDescription("The slash command identification value.")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reload")
        .setDescription("Reloads slash commands for the application.")
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction) {
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    const guild = interaction.guildId;
    const client = interaction.client.user.id;

    if (interaction.options.getSubcommand() === "delete") {
      const command = interaction.options.getString("command");

      if (command) {
        await rest.delete(
          Routes.applicationGuildCommand(client, guild, command)
        );

        await interaction.reply({
          content: "Deleted a slash command.",
          ephemeral: true,
        });
      } else {
        const file = "administrator";
        const module = require(`./${file}`);

        await rest.put(Routes.applicationGuildCommands(client, guild), {
          body: [module.data.toJSON()],
        });

        await interaction.reply({
          content: "Deleted all slash commands.",
          ephemeral: true,
        });
      }
    }

    if (interaction.options.getSubcommand() === "reload") {
      const commands = [];
      const commandFiles = fs
        .readdirSync(__dirname)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`./${file}`);
        commands.push(command.data.toJSON());
      }

      await rest.put(Routes.applicationGuildCommands(client, guild), {
        body: commands,
      });

      await interaction.reply({
        content: "Reloaded all slash commands.",
        ephemeral: true,
      });
    }
  },
};
