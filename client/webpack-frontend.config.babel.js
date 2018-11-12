const path = require("path")
const CompressionPlugin = require("compression-webpack-plugin")
/* const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin */
// puts our index.html in the output folder and adds a <script> tag including bundle.js
const HtmlWebpackPlugin = require("html-webpack-plugin")
// informs webpack to bundle in production
const webpack = require("webpack")
const ProgressBarPlugin = require("progress-bar-webpack-plugin")
const nodeExternals = require("webpack-node-externals")

module.exports = env => {
  const {getIfUtils, removeEmpty} = require("webpack-config-utils")
  const {ifProd, ifNotProd} = getIfUtils(env)
  return {
    context: path.resolve(__dirname, "src"),
    entry: {
      app: "./App.js",
      vendor: ["react", "redux", "lodash"]
    },
    // ['./App.js'],
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.[name].[hash].js",
      publicPath: "/", // use with historyApiFallback
      pathinfo: ifNotProd() // for dev, makes comments for files in browser devtools
    },
    devtool: env.prod ? "source-map" : "eval",
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
          target: "http://192.168.68.8:3001",
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
    // This replaces the deprecated CommonsChunkPlugin
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: "vendor"
          }
        }
      }
    },
    plugins: removeEmpty([
      /* ifNotProd( */
      /*   new BundleAnalyzerPlugin({ */
      /*     analyzerMode: "server", */
      /*     analyzerHost: "0.0.0.0" */
      /*   }) */
      /* ), */
      new ProgressBarPlugin(),
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
      net: "empty",
      dns: "empty"
    }
  }
}
