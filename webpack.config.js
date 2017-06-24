const path = require('path')
// puts our index.html in the output folder and adds a <script> tag including bundle.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// informs webpack to bundle in production
const webpack = require('webpack')

const client = {
  context: path.resolve(__dirname, 'client/src'),
  entry: './clientApp.js',
  output: {
    path: path.join(__dirname, 'client/dist'),
    filename: 'bundle.js',
    publicPath: '/' // use with historyApiFallback
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&-minimize'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        loader: 'file-loader'
      }
    ]
  },
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
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin({sourceMap: true})
  )
}

module.exports = client
