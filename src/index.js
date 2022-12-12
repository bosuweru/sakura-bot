/**
 * @file Initializes the applicaiton.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

// Initialize environment variables.
const { config } = require("dotenv");
const { expand } = require("dotenv-expand");

const result = config({
  path: path.join(__dirname, "..", "private", ".env"),
  debug: false,
  encoding: "utf8",
  override: false,
});

if (result.error) throw result.error;
expand(result);

// Initialize Discord.js client.
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
client.gameData = new Collection();
client.consoleData = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, "events");
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

client.login(process.env.TOKEN);
