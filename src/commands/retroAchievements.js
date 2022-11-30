/**
 * @file Initializes the 'retroAchievements' command.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.3.0
 */

"use strict";

const axios = require("axios");

// TODO: Remove this and use a database instead (and maybe a cache).
const { RA } = require("../../private/configuration/application.json");

const { SlashCommandBuilder } = require("discord.js");

async function fetchConsole() {
  const arr = [];
  const key = `key=${RA.API}`;
  const usr = `user=${RA.USR}`;
  const url = `https://ra.hfc-essentials.com/console_id.php?${usr}&${key}&mode=json`;

  const resp = await axios.get(url);
  const data = resp.data.console[0];

  data.forEach((item) => arr.push(item.Name));
  return arr;
}

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
    // TODO: To be continued...
  },
  async autocomplete(interaction) {
    let options;
    const focused = interaction.options.getFocused(true);

    if (focused.name === "console") {
      options = await fetchConsole();
    } else if (focused.name === "game") {
      // TODO: Do something with this, too.
      options = ["Game"];
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
