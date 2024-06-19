module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {

    camelcase: 'error',
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
        leadingUnderscore: "allow",
        modifiers: ["exported"]
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE"],
        leadingUnderscore: "forbid",
        modifiers: ["global"]
      },
      {
        selector: "function",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "allow"
      },
      {
        selector: "interface",
        format: ["PascalCase"]
      }
    ],

    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
