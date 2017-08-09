const path = require('path')
// puts our index.html in the output folder and adds a <script> tag including bundle.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// informs webpack to bundle in production
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const client = {
  context: path.resolve(__dirname, 'client/src'),
  entry: ['webpack-hot-middleware/client', './App.js'],
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/' // use with historyApiFallback
  },
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true // redirects all browser requests to publicPath, then react router takes over.  prevents browser from grabbing assets from the server while using webdevserver.
  },
  resolve: {
    extensions: ['.js', '.jsx'] // common extensions
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
      // favicon: './assets/images/favicon.ico'
    })
  ]
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

const shared = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['react-hot-loader', 'babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        use: ['file-loader?name=[name].[ext]']
      }
    ]
  }
}

module.exports = Object.assign({}, shared, client)
// Object.assign({}, shared, server)
