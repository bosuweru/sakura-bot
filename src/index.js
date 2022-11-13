"use strict";

const path = require("node:path");

const { result } = require("./utils/dotenv");
const { ShardingManager } = require("discord.js");

const client = path.join(__dirname, "client", "client.js");
const manager = new ShardingManager(client, {
  token: result.parsed.TOKEN,
});

manager.on("shardCreate", (shard) => {
  console.log(`Launched Shard ${shard.id}!`);
});

manager.spawn();
