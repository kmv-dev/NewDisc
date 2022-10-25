module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'vue/no-reserved-component-names': 0,
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-components': ['warn'],
    'max-len': 'off',
    camelcase: 'off',
    'no-underscore-dangle': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-async-promise-executor': 'off',
    'no-return-await': 'off',
    'no-unused-vars': 'off',
    'import/no-dynamic-require': 'off',
    'no-restricted-globals': 'off',
    'global-require': 'off',
    'no-multi-assign': 'off',
    'consistent-return': 'off'
  }
}
