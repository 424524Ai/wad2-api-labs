import global from "globals";
import plugins from "@eslint/js";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2015,  // ES6
      sourceType: "module",  // Use module format
    },
    rules: {
      "semi": 1,
      "no-console": "off",
    },
  },
  plugins.configs.recommended,
];