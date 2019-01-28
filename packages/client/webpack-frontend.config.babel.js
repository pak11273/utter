const path = require("path")
const CompressionPlugin = require("compression-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin
// puts our index.html in the output folder and adds a <script> tag including bundle.js
const HtmlWebpackPlugin = require("html-webpack-plugin")
// informs webpack to bundle in production
const webpack = require("webpack")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const nodeExternals = require("webpack-node-externals")
const Dotenv = require("dotenv-webpack")

module.exports = env => {
  const {getIfUtils, removeEmpty} = require("webpack-config-utils")
  const {ifProd, ifNotProd} = getIfUtils(env)
  return {
    context: path.resolve(__dirname, "src"),
    entry: {
      app: "./App.js"
    },
    // ['./App.js'],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.[name].[hash].js",
      publicPath: "/", // use with historyApiFallback
      pathinfo: ifNotProd() // for dev, makes comments for files in browser devtools
    },
    devtool: env.prod ? "source-map" : "eval",
    watchOptions: {
      /*   aggregateTimeout: 30, */
      /* watch: true, */
      /* poll: 100, */
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
          test: /\.(jpe?g|png|gif|svg|ico|mp3)$/i,
          use: [
            {loader: "file-loader?name=[name].[ext]"}
            // {
            //   loader: 'image-webpack-loader',
            //   // This loader reduces image size by half
            //   // Specify enforce: 'pre' to apply the loader
            //   // before url-loader/svg-url-loader
            //   // and not duplicate it in rules with them
            //   options: {
            //     enforce: 'pre',
            //     bypassOnDebug: true
            //   }
            // }
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
    // bundles npm packages e.g. npm.react-dom.899sadfhj4.js
    // visitors will never download the same package twice!
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              // get the name. E.g. node_modules/packageName/not/this/part.js
              // or node_modules/packageName
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1]

              // npm package names are URL-safe, but some servers don't like @ symbols
              return `npm.${packageName.replace("@", "")}`
            }
          }
        }
      }
    },
    plugins: removeEmpty([
      ifNotProd(
        new BundleAnalyzerPlugin({
          analyzerMode: "server",
          analyzerHost: "0.0.0.0"
        })
      ),
      new Dotenv(),
      new ProgressBarPlugin(),
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly:w
      ifProd(
        new webpack.DefinePlugin({
          // <-- key to reducing React's size
          "process.env": {
            NODE_ENV: JSON.stringify("production")
          }
        })
      ),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: "index.html"
        // inject: 'head'
        // favicon: './assets/images/favicon.ico',
        // inject: false
      }),
      // ifProd(new webpack.optimize.UglifyJsPlugin({sourceMap: true})), //minify everything
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.AggressiveMergingPlugin() //Merge chunks
    ]),
    node: {
      fs: "empty",
      net: "empty",
      dns: "empty"
    }
  }
}
