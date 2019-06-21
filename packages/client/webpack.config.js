const path = require("path")
const CompressionPlugin = require("compression-webpack-plugin")
// puts our index.html in the output folder and adds a <script> tag including bundle.js
const HtmlWebpackPlugin = require("html-webpack-plugin")
// informs webpack to bundle in production
const webpack = require("webpack")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const Dotenv = require("dotenv-webpack")
const webpackMerge = require("webpack-merge")
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)
const presetConfig = require("./build-utils/load-presets.js")

module.exports = ({mode, presets} = {mode: "production", presets: []}) => {
  console.log("mode: ", mode)
  return webpackMerge(
    {
      mode,
      context: path.resolve(__dirname, "src"),
      entry: {
        app: "./app.js"
      },
      output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.[name].[hash].js",
        chunkFilename: "bundle.[name].[hash].js",
        publicPath: "/" // use with historyApiFallback
      },
      devtool: "eval",
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
            // exclude: /node_modules/,
            use: ["cache-loader", "style-loader", "css-loader"]
          },
          {
            test: /\.scss$/,
            use: [
              "style-loader",
              /* MiniCssExtractPlugin.loader, */
              "css-loader",
              "sass-loader"
            ]
          },
          {
            test: /\.(jpe?g|png|gif|svg|ico|mp3)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192
                }
              }
            ]
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
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
          template: "index.html",
          chunksSortMode: "none" // fixes the cyclic dependency issue
        }),
        // new webpack.optimize.ModuleConcatenationPlugin(), // new optimization
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
    },
    modeConfig(mode),
    presetConfig({mode, presets})
  )
}
