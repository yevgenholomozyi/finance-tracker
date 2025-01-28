import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import airbnbBase from "eslint-config-airbnb-base";
import pluginImport from "eslint-plugin-import";

export default [
  // Include the JavaScript recommended config
  pluginJs.configs.recommended,
  // Include Vue essential config
  ...pluginVue.configs["flat/essential"],
  // Include Airbnb base config
  {
    rules: airbnbBase.rules, // Use Airbnb rules
  },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: globals.browser, // Add browser globals
    },
    rules: {
      "no-console": "warn",
      "no-undef": "off",
      "vue/multi-word-component-names": "off",
    },
  },
];
