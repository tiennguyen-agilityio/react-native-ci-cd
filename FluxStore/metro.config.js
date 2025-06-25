const path = require('path');
const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const config = {};

if (process.env.NODE_ENV === 'production') {
  module.exports = mergeConfig(defaultConfig, config);
} else {
  const withStorybook = require('@storybook/react-native/metro/withStorybook');
  const finalConfig = mergeConfig(defaultConfig, config);
  module.exports = withStorybook(finalConfig, {
    enabled: true,
    configPath: path.resolve(__dirname, './.storybook'),
  });
}
