"use strict";
const fs = require("fs/promises");
const path = require("path");
const { ESLint } = require("eslint");

/**
 * @link https://eslint.org/docs/user-guide/configuring/
 */
const baseConfig = {
  extends: ["plugin:@typescript-eslint/recommended", "prettier"],
  plugins: ["jest", "@typescript-eslint", "prettier"],
  env: {
    commonjs: true,
    es2020: true,
    "jest/globals": true,
    node: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-var-requires": "off",
  },
};

/**
 * @link https://eslint.org/docs/developer-guide/nodejs-api
 * @param fix boolean
 * @return {Promise<void>}
 */
const lint = async (fix) => {
  try {
    const overrideConfigFilePath = path.resolve(
      `${process.cwd()}/.eslintrc.yaml`
    );
    const overrideConfigFile = await fs
      .stat(overrideConfigFilePath)
      .then(() => overrideConfigFilePath)
      .catch(() => undefined);

    const eslint = new ESLint({ baseConfig, overrideConfigFile, fix });
    const results = await eslint.lintFiles("**/*.js");

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
