const path = require("path")
const webpack = require("webpack")
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
      filename: "bundle.[name].[hash].js"
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
    plugins: [
      new HtmlWebpackPlugin({
        template: "index.html"
      }),
      new webpack.ProgressPlugin()
    ]
  }
}
