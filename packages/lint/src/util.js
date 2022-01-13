"use strict";
const fs = require("fs/promises");
const path = require("path");

const existFileOrDirectory = (path) =>
  fs
    .stat(path)
    .then(() => true)
    .catch(() => false);

const writeFile = (path, content) => fs.writeFile(path, content);
const getFile = (file) => fs.readFile(path.resolve(__dirname, "../files/", file));

module.exports = { existFileOrDirectory, writeFile, getFile };
