const path = require("path")
const webpack = require("webpack")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = env => {
  console.log("env: ", env)
  return {
    context: path.resolve(__dirname, "src"),
    mode: env,
    entry: {
      main: "./App.js"
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.[name].[hash].js",
      publicPath: "/" // use with historyApiFallback
    },
    devServer: {
      stats: "minimal",
      disableHostCheck: true,
      historyApiFallback: true // redirects all browser requests to publicPath, then react router takes over.  prevents browser from grabbing assets from the server while using webdevserver.
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.m?js$/,
          loader: "babel-loader"
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico|mp3)$/i,
          loader: "file-loader?name=[name].[ext]"
        },
        {
          test: /\.css$/,
          // exclude: /node_modules/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    node: {
      fs: "empty",
      net: "empty",
      dns: "empty"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html"
      }),
      new ProgressBarPlugin(),
      /* new webpack.ProgressPlugin() */
      new webpack.HotModuleReplacementPlugin()
    ]
  }
}
