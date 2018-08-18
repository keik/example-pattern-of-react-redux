module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ["flowtype", "react"],
  extends: [
    "eslint:recommended",
    "plugin:flowtype/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier/flowtype",
    "prettier/react"
  ],
  settings: {
    react: {
      version: "16.4"
    }
  }
};
