const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

let config = {};
const defaultConfig = getDefaultConfig(__dirname);

const isCI = process.env.CI === 'true' || process.env.NODE_ENV === 'production';

if (isCI) {
  // just use regular metro config for CI
  module.exports = mergeConfig(defaultConfig, config);
} else {
  const withStorybook = require('@storybook/react-native/metro/withStorybook');
  const finalConfig = mergeConfig(defaultConfig, config);
  module.exports = withStorybook(finalConfig, {
    enabled: true,
    configPath: path.resolve(__dirname, './.storybook'),
  });
}
