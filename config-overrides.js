const webpack = require("webpack");

module.exports = function override(config, env) {
  // Add fallback for Node.js core modules in the browser
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    buffer: require.resolve("buffer"),
    process: require.resolve("process/browser.js"), // Added `.js` extension
  };

  // Add `.js`, `.jsx`, `.ts`, `.tsx`, and `.json` extensions for resolution
  config.resolve.extensions = [".js", ".jsx", ".ts", ".tsx", ".json"];

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser.js", // Added `.js` extension here too
      Buffer: ["buffer", "Buffer"],
    }),
  ]);

  return config;
};
