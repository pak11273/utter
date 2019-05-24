const path = require("path")
const CompressionPlugin = require("compression-webpack-plugin")
// puts our index.html in the output folder and adds a <script> tag including bundle.js
const HtmlWebpackPlugin = require("html-webpack-plugin")
// informs webpack to bundle in production
const webpack = require("webpack")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const Dotenv = require("dotenv-webpack")

module.exports = env => {
  return {
    context: path.resolve(__dirname, "src"),
    entry: {
      app: "./App.js"
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.[name].[hash].js",
      publicPath: "/" // use with historyApiFallback
    },
    devtool: env.prod ? "source-map" : "eval",
    watchOptions: {
      ignored: /node_modules/
    },
    devServer: {
      stats: "minimal",
      disableHostCheck: true,
      historyApiFallback: true, // redirects all browser requests to publicPath, then react router takes over.  prevents browser from grabbing assets from the server while using webdevserver.
      proxy: [
        {
          context: [
            "/admin/uploadFile",
            "/auth",
            "/api",
            "/api/users",
            "/api/channels",
            "/api/comments",
            "/api/courses",
            "/api/events",
            "/api/vocab",
            "/api/zones",
            "/api/test",
            "/cdn",
            "/graphql",
            "/socket.io",
            "/lions",
            "/tigers",
            "/mail"
          ],
          target: "http://192.168.68.8:3010",
          ws: true
        }
      ]
    },
    resolve: {
      alias: {"react-dom": "@hot-loader/react-dom"},
      extensions: [".mjs", ".js", ".jsx"] // common extensions
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto"
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ["cache-loader", "babel-loader"]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader", "eslint-loader"]
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: [{loader: "graphql-import-loader"}]
        },
        {
          test: /\.css$/,
          use: ["cache-loader", "style-loader", "css-loader"]
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico|mp3)$/i,
          use: [{loader: "file-loader?name=[name].[ext]"}]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            // DO NOT cache this
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]"
              }
            }
          ]
        },
        {
          test: /react-icons\/(.)*(.js)$/,
          use: ["cache-loader", "babel-loader"]
        }
      ]
    },
    plugins: [
      new Dotenv(),
      new ProgressBarPlugin(),
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly:w
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: "index.html"
      }),
      new CompressionPlugin({
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    node: {
      fs: "empty",
      net: "empty",
      dns: "empty"
    }
  }
}
