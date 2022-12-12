/**
 * @file Assists with RetroAchievements data management.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.4.0
 */

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const axios = require("axios");

const key = process.env.RETROACHIEVEMENTS_KEY;
const mode = "json";
const user = process.env.RETROACHIEVEMENTS_USER;

async function fetchConsoleData() {
  const url = `https://ra.hfc-essentials.com/console_id.php?user=${user}&key=${key}&mode=${mode}`;
  const res = await axios.get(url);

  return res.data;
}

async function writeConsoleData() {
  // eslint-disable-next-line prettier/prettier
  const file = path.join(__dirname, "..", "..", "private", "data", "ConsoleData", "console.json");
  const data = await fetchConsoleData();

  const result = JSON.stringify(data);

  fs.writeFileSync(file, result);
}

function cacheConsoleData(collection) {
  // eslint-disable-next-line prettier/prettier
  const file = path.join(__dirname, "..", "..", "private", "data", "ConsoleData", "console.json");
  const data = fs.readFileSync(file);

  const parsed = JSON.parse(data);
  const result = parsed.console[0];

  result.forEach((item) => {
    collection.set(item.Name, item.ID);
  });
}

module.exports = { cacheConsoleData, writeConsoleData };
