const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configure resolver to handle native-only modules on web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure proper module resolution
config.resolver.sourceExts = [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx', 'cjs'];

// Add alias for react-native-maps on web platform
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native-maps': require.resolve('./web-stubs/react-native-maps.js'),
};

// Add resolver for native-only modules
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;