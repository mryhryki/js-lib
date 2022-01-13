"use strict";
const { ESLint } = require("eslint");
const { existFileOrDirectory, getFile, writeFile } = require("./util");

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
    const currentDir = process.cwd();
    const eslintrc = `${currentDir}/.eslintrc.yaml`;
    const prettierrc = `${currentDir}/.prettierrc.json`;
    const editorConfig = `${currentDir}/.editorconfig`;

    if (!(await existFileOrDirectory(eslintrc))) {
      const packageJson = require(`${currentDir}/package.json`);
      const useReact = packageJson?.dependencies?.react != null || packageJson?.devDependencies?.react != null;
      const config = await getFile(`.eslintrc.${useReact ? "react" : "node"}.yaml`);
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

    const eslint = new ESLint({ baseConfig, fix });
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
