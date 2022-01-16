"use strict";
const { ESLint } = require("eslint");
const { existFileOrDirectory, getFile, writeFile } = require("./util");

/**
 * @link https://eslint.org/docs/developer-guide/nodejs-api
 * @param fix boolean
 * @return {Promise<void>}
 */
const lint = async (fix) => {
  try {
    const currentDir = process.cwd();
    const eslintrc = `${currentDir}/.eslintrc.yaml`;
    const prettierrc = `${currentDir}/.prettierrc.json`;
    const editorConfig = `${currentDir}/.editorconfig`;

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

    const eslint = new ESLint({ fix, errorOnUnmatchedPattern: false });
    const patterns = [
      `${currentDir}/*.js`,
      `${currentDir}/*.jsx`,
      `${currentDir}/*.ts`,
      `${currentDir}/*.tsx`,
      `${currentDir}/src/**/*.js`,
      `${currentDir}/src/**/*.jsx`,
      `${currentDir}/src/**/*.ts`,
      `${currentDir}/src/**/*.tsx`,
    ];
    const results = await eslint.lintFiles(patterns);
    if (fix) {
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

module.exports = { lint };
