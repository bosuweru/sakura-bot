/**
 * @file Initializes the client.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.1.0
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const {
  fetchGameData,
  fetchConsoleData,
} = require("../helpers/retroAchievements");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.retroAchievements = new Collection();

const commandsPath = path.join(__dirname, "..", "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "..", "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

fetchConsoleData(client.retroAchievements);

setTimeout(() => {
  fetchGameData(client.retroAchievements);
}, 10000);

client.login(process.env.TOKEN);
