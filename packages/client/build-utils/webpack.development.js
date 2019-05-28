const webpack = require("webpack")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

module.exports = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerHost: "0.0.0.0"
    }),
    new webpack.DefinePlugin({
      __REACT_DEVTOOLS_GLOBAL_HOOK__: "({ isDisabled: true })"
    })
  ]
})
