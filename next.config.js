const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withImages = require("next-images");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = withImages(
  withCSS(
    withSass({
      onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 25 * 1000,
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 2
      },
      useFileSystemPublicRoutes: false,
      webpack: function(config) {
        config.optimization.minimizer = [
          new TerserPlugin({
            exclude: [/^CardView\.js(\?.*)?$/i]
          })
        ];
        return config;
      }
    })
  )
);
