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

function getGameList(platform, collection) {
  const gameList = [];
  const gameData = collection.get(platform);

  gameData.forEach((item) => {
    gameList.push(item.Title);
  });

  return gameList;
}

function getConsoleList(collection) {
  return Array.from(collection.keys());
}

async function fetchGameData(id) {
  const url = `https://ra.hfc-essentials.com/game_list.php?user=${user}&key=${key}&console=${id}&mode=${mode}`;
  const res = await axios.get(url);

  return res.data;
}

async function fetchConsoleData() {
  const url = `https://ra.hfc-essentials.com/console_id.php?user=${user}&key=${key}&mode=${mode}`;
  const res = await axios.get(url);

  return res.data;
}

async function writeGameData(id, platform) {
  let fileName;

  switch (platform) {
    case "PC-8000/8800":
      fileName = "pc-8000";
      break;
    default:
      fileName = platform.toLowerCase();
      break;
  }

  // eslint-disable-next-line prettier/prettier
  const file = path.join(__dirname, "..", "..", "private", "data", "GameData", `${fileName}.json`);
  const data = await fetchGameData(id);

  const result = JSON.stringify(data);

  fs.writeFileSync(file, result);
}

async function writeConsoleData() {
  // eslint-disable-next-line prettier/prettier
  const file = path.join(__dirname, "..", "..", "private", "data", "ConsoleData", "console.json");
  const data = await fetchConsoleData();

  const result = JSON.stringify(data);

  fs.writeFileSync(file, result);
}

function cacheGameData(collection) {
  // eslint-disable-next-line prettier/prettier
  const gameFolder = path.join(__dirname, "..", "..", "private", "data", "GameData");
  const gameFiles = fs
    .readdirSync(gameFolder)
    .filter((file) => file.endsWith(".json"));

  for (const gameFile of gameFiles) {
    const file = path.join(gameFolder, gameFile);
    const data = fs.readFileSync(file);

    const parsed = JSON.parse(data);
    const result = parsed.game[0];

    if (result[0]) collection.set(result[0].ConsoleName, result);
  }
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

module.exports = {
  getGameList,
  cacheGameData,
  fetchGameData,
  writeGameData,
  getConsoleList,
  cacheConsoleData,
  fetchConsoleData,
  writeConsoleData,
};
