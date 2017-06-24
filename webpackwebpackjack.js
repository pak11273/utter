const path = require('path')
// puts our index.html in the output folder and adds a <script> tag including bundle.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
// informs webpack to bundle in production
const webpack = require('webpack')

const common = {
  module: {
    rules: [
      /* common loaders */
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
  plugins: [
    /* common plugins */
  ],
  resolve: {
    extensions: ['.js', '.jsx'] // common extensions
  }
  // other plugins, postcss config etc. common for frontend and backend
}

const client = {
  entry: ['./client/src/clientApp.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/' // use with historyApiFallback
  },
  devtool: 'source-map',
  module: {
    rules: []
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true // redirects all browser requests to publicPath, then react router takes over.  prevents browser from grabbing assets from the server while using webdevserver.
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/src/index.html'
    })
  ]
}

const server = {
  entry: ['./server/src/index.js'],
  target: 'node',
  output: {
    path: __dirname + './server/dist',
    filename: 'index.js'
  }
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

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server)
]
