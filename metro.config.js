const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Configure resolver to handle native-only modules on web
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure proper module resolution
config.resolver.sourceExts = [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx', 'cjs'];

// Add alias for native-only modules on web
config.resolver.alias = {
  ...config.resolver.alias,
  // Stub out native-only modules for web
  'react-native/Libraries/Utilities/codegenNativeCommands': path.resolve(__dirname, 'web-stubs/codegenNativeCommands.js'),
  'react-native/Libraries/Utilities/codegenNativeComponent': path.resolve(__dirname, 'web-stubs/codegenNativeComponent.js'),
};

// Configure resolver to ignore native modules on web
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];

module.exports = config;