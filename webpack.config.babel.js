const path = require('path')
// puts our index.html in the output folder and adds a <script> tag including bundle.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// informs webpack to bundle in production
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = env => {
  const {getIfUtils} = require('webpack-config-utils')
  const {ifProd, ifNotProd} = getIfUtils(env)
  return {
    context: path.resolve(__dirname, 'client/src'),
    // entry: ['webpack-hot-middleware/client', './App.js'],
    entry: ['react-hot-loader/patch', './App.js'],
    output: {
      path: path.join(__dirname, 'client/dist'),
      filename: 'bundle.js',
      publicPath: '/', // use with historyApiFallback
      pathinfo: ifNotProd() // for dev, makes comments for files in browser devtools
    },
    devtool: env.prod ? 'source-map' : 'eval',
    devServer: {
      disableHostCheck: true,
      historyApiFallback: true, // redirects all browser requests to publicPath, then react router takes over.  prevents browser from grabbing assets from the server while using webdevserver.
      proxy: [
        {
          context: [
            '/admin/uploadFile',
            '/auth',
            '/api',
            '/api/users',
            '/api/channels',
            '/api/comments',
            '/api/events',
            '/api/vocab',
            '/api/zones',
            '/cdn',
            '/wtf',
            '/socket.io',
            '/lions',
            '/tigers',
            '/mail'
          ],
          target: 'http://192.168.68.8:3001',
          ws: true
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx'] // common extensions
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['cache-loader', 'react-hot-loader/webpack', 'babel-loader']
        },
        {
          test: /\.css$/,
          // exclude: /node_modules/,
          use: ['cache-loader', 'style-loader', 'css-loader']
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico|mp3)$/i,
          use: ['file-loader?name=[name].[ext]']
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            // DO NOT cache this
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        },
        {
          test: /react-icons\/(.)*(.js)$/,
          use: ['cache-loader', 'babel-loader']
        }
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new webpack.DefinePlugin({
        // <-- key to reducing React's size
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: 'index.html',
        // favicon: './assets/images/favicon.ico',
        inject: false
      }),
      new webpack.optimize.UglifyJsPlugin({sourceMap: true}), //minify everything
      new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ],
    node: {
      net: 'empty',
      dns: 'empty'
    }
  }
}

// const server = {
//   context: path.resolve(__dirname, 'server/dist'),
//   entry: ['./index.js'],
//   output: {
//     path: path.join(__dirname, 'server/dist'),
//     filename: 'bundle.js'
//   },
//   target: 'node',
//   externals: [nodeExternals()] // in order to ignore all modules in node_modules folder
// }

// const shared = {
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: ['react-hot-loader', 'babel-loader']
//       },
//       {
//         test: /\.css$/,
//         exclude: /node_modules/,
//         use: ['style-loader', 'css-loader']
//       },
//       {
//         test: /\.(jpe?g|png|gif|svg|ico|mp3)$/i,
//         use: ['file-loader?name=[name].[ext]']
//       },
//       {
//         test: /react-icons\/(.)*(.js)$/,
//         use: 'babel-loader'
//       }
//     ]
//   }
// }

// module.exports = Object.assign({}, shared, client(env))
// Object.assign({}, shared, server)
