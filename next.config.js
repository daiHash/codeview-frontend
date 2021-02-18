const withImages = require("next-images");

module.exports = withImages({
  exclude: path.resolve(
    __dirname,
    "src/components/SnippetCard/assets/heart.svg"
  ),
  webpack(config, options) {
    return config;
  },
});
