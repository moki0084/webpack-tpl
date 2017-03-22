module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'root': true,
  'parser': 'babel-eslint',
  'globals': {
    '$': false,
    'DEVELOPMENT': true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  parserOptions: {
    'sourceType': 'module'
  },
  rules: {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'no-useless-escape': 0,
    'generator-star-spacing': 0,
    'semi': 0,
    'no-mixed-operators': 0,
    'no-mixed-spaces-and-tabs': 2,
    'space-before-function-paren': 0,
    'prefer-promise-reject-errors': 0,
    'space-in-parens': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  }
};
