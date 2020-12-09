// eslint-disable-next-line
module.exports = {
  root: true,
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "react/jsx-props-no-spreading": [
      "warn",
      {
        html: "enforce",
        custom: "enforce",
        explicitSpread: "ignore",
      },
    ],
    "react/require-default-props": "off",
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { 'exceptAfterSingleLine': true },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};