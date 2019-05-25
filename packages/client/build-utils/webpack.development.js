const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

module.exports = () => ({
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      analyzerHost: "0.0.0.0"
    })
  ]
})
