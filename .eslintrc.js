module.exports = {
  extends: [
    "react-app",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react-hooks", "@typescript-eslint", "prettier"],
  globals: {
    context: "readonly",
    cy: "readonly",
    assert: "readonly",
    Cypress: "readonly",
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
        semi: true,
      },
    ],
    "no-unused-vars": ["error"],
    "no-console": "warn",
    "no-undef": "off",
    "jsx-a11y/href-no-hash": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-explicit-any": "off",
  },
  ignorePatterns: "serviceWorker.ts"
};
