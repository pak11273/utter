const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = () => ({
  devtool: "",
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    }
  }
})
