/**
 * @file Initializes the applicaiton.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.1.0
 */

"use strict";

const path = require("node:path");

const { Env } = require("./utils/dotenv");
const { Log } = require("./utils/winston");

const { ShardingManager } = require("discord.js");

const env = new Env();
const config = env.config();
const expand = env.expand(config);

const logger = new Log();
const client = path.join(__dirname, "client", "client.js");
const manager = new ShardingManager(client, {
  token: expand.parsed.TOKEN,
});

manager.on("shardCreate", (shard) => {
  logger.write("info", `Created Shard ${shard.id}.`);
});

manager.spawn();
