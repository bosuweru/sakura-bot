/**
 * @file Initializes the retroAchievements helper.
 * @author bosuweru <116328571+bosuweru@users.noreply.github.com>
 * @license AGPL-3.0
 * @version 0.3.0
 */

"use strict";

const axios = require("axios");

const { RA } = require("../../private/configuration/application.json");

function fetchGameData(collection) {
  const obj = collection.get("console");
  const key = `key=${RA.API}`;
  const usr = `user=${RA.USR}`;

  let timeout = 10000;

  obj.forEach((item) => {
    setTimeout(async () => {
      const id = item.ID;
      const name = item.Name;

      const addr = `https://ra.hfc-essentials.com/game_list.php?${usr}&${key}&console=${id}&mode=json`;
      const resp = await axios.get(addr);
      const data = resp.data.game[0];

      // TODO: This is just "good enough" but could be better.
      collection.set(name, data);
    }, timeout);

    timeout = timeout + 10000;
  });
}

async function fetchConsoleData(collection) {
  const key = `key=${RA.API}`;
  const usr = `user=${RA.USR}`;
  const url = `https://ra.hfc-essentials.com/console_id.php?${usr}&${key}&mode=json`;

  const resp = await axios.get(url);
  const data = resp.data.console[0];

  collection.set("console", data);
}

function getGameOptions(collection, platform) {
  const data = collection.get(platform);
  const options = [];

  data.forEach((item) => options.push(item.Title));

  return options;
}

function getConsoleOptions(collection) {
  const data = collection.get("console");
  const options = [];

  data.forEach((item) => options.push(item.Name));

  return options;
}

module.exports = {
  fetchGameData,
  fetchConsoleData,
  getGameOptions,
  getConsoleOptions,
};
