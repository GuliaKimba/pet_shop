module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-uses-react': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'linebreak-style': ['error', 'unix'],
    'implicit-arrow-linebreak': 0,
    'import/prefer-default-export': 'off',
    'react/prop-types': 0,
    'react/jsx-quotes': 0,
    'jsx-quotes': [2, 'prefer-single'],
    'no-console': 0,
    'no-underscore-dangle': 0,
    'import/no-cycle': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-closing-bracket-location': 0,
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: { multiline: false },
      },
    ],
  },
}
