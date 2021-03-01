module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'linebreak-style': 0,
    'semi': 'off',
    'object-curly-spacing': 0,
    'padded-blocks': 0,
    'comma-dangle': 0,
    'no-trailing-spaces': 0,
    'indent': 0,
    'max-len': 0,
    'quotes': 0,
    'require-jsdoc': 0,
    'eol-last': 0,
    'arrow-parens': 0,
    'operator-linebreak': 'off'
  },
};
