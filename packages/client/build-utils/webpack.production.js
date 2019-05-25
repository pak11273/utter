const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

module.exports = () => ({
  devtool: "",
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true
      })
    ],
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
