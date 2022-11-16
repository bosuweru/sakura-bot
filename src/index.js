"use strict";

const path = require("node:path");

const { result } = require("./utils/dotenv");
const { logger } = require("./utils/winston");
const { ShardingManager } = require("discord.js");

const client = path.join(__dirname, "client", "client.js");
const manager = new ShardingManager(client, {
  token: result.parsed.TOKEN,
});

manager.on("shardCreate", (shard) => {
  logger.info(`Launched Shard ${shard.id}!`);
});

manager.spawn();
