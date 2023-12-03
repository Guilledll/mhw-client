const antfu = require('@antfu/eslint-config').default

/**
 * Eslint configuration for analysis and styling
 *
 * @link https://github.com/antfu/eslint-config
 */
module.exports = antfu({
  vue: true,
  typescript: true,
  rules: {
    'style/semi': 'off',
  },
})
