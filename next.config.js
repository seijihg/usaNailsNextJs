const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const path = require("path");

const nextConfig = {
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }

    return config;
  },
  target: "serverless",
};

module.exports = withPlugins([[withImages]], nextConfig);
