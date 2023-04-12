module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.eslint.json", "./packages/*/tsconfig.json"],
  },
  extends: [
    "airbnb",
    "airbnb-typescript",
    "plugin:prettier/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],

  plugins: [
    "import",
    "prettier",
    "react-hooks",
    "@typescript-eslint",
    "jest-dom",
  ],

  rules: {
    "@typescript-eslint/comma-dangle": 0,
    "@typescript-eslint/naming-convention": [
      "warn",
      {
        selector: "parameter",
        format: ["camelCase", "snake_case"],
        leadingUnderscore: "allow",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      1,
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "_",
        varsIgnorePattern: "_",
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/no-unsafe-argument": "error",
    "@typescript-eslint/no-empty-function": ["warn"],
    "consistent-return": 0,
    "default-case": 0,
    "import/default": 1,
    "import/first": 1,
    "import/no-cycle": 0,
    "import/prefer-default-export": 0,
    "no-nested-ternary": 0,
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-underscore-dangle": 0,
    "prefer-object-spread": 0,
    "react/destructuring-assignment": 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/jsx-curly-newline": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "react/no-array-index-key": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "@typescript-eslint/no-explicit-any": "error",
  },
};
