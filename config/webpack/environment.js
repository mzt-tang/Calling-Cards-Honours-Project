const { environment } = require('@rails/webpacker')
const tsconfig_paths = require('./tsconfig_paths')

environment.config.merge(tsconfig_paths)

module.exports = environment
