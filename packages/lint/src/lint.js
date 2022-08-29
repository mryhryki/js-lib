#!/usr/bin/env node
"use strict";

const path = require("node:path");
const { ESLint } = require("eslint");
const { existFileOrDirectory, getFile, writeFile } = require("./util");

/**
 * @link https://eslint.org/docs/developer-guide/nodejs-api
 * @return {Promise<void>}
 */
const lint = async () => {
  try {
    const currentDir = process.cwd();
    const eslintrc = `${currentDir}/.eslintrc.yaml`;
    const prettierrc = `${currentDir}/.prettierrc.json`;
    const editorConfig = `${currentDir}/.editorconfig`;

    const options = { dir: currentDir, fix: false };
    for (let i = 2; i < process.argv.length; i++) {
      const arg = process.argv[i];
      switch (arg) {
        case "--directory":
        case "-d":
          options.dir = path.resolve(currentDir, process.argv[i + 1]);
          i++;
          break;
        case "--fix":
          options.fix = true;
          break;
      }
    }

    if (!options.dir.startsWith(currentDir)) {
      throw new Error(`Invalid directory: ${options.dir}`);
    }
    console.info(`Target directory: ${options.dir}`);

    if (!(await existFileOrDirectory(eslintrc))) {
      const config = await getFile(".eslintrc.yaml");
      await writeFile(eslintrc, config);
    }

    if (!(await existFileOrDirectory(prettierrc))) {
      const config = await getFile(".prettierrc.json");
      await writeFile(prettierrc, config);
    }

    if (!(await existFileOrDirectory(editorConfig))) {
      const config = await getFile(".editorconfig");
      await writeFile(editorConfig, config);
    }

    const eslint = new ESLint({ fix: options.fix, errorOnUnmatchedPattern: false });
    const patterns = [
      `${options.dir}/*.js`,
      `${options.dir}/*.jsx`,
      `${options.dir}/*.ts`,
      `${options.dir}/*.tsx`,
      `${options.dir}/src/**/*.js`,
      `${options.dir}/src/**/*.jsx`,
      `${options.dir}/src/**/*.ts`,
      `${options.dir}/src/**/*.tsx`,
    ];
    const results = await eslint.lintFiles(patterns);
    if (options.fix) {
      await ESLint.outputFixes(results);
    }

    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    console.log(resultText);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
};

lint();
