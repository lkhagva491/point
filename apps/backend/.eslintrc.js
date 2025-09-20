module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'c:\\Projects\\point\\apps\\backend\\tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Warn for console.log, allow console.warn and console.error
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^ _c',
        varsIgnorePattern: '^ _c',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'c:\\Projects\\point\\apps\\backend\\tsconfig.json',
      },
    },
  },
};