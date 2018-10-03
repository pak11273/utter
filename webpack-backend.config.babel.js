const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const StartServerPlugin = require('start-server-webpack-plugin')

module.exports = env => {
  const {getIfUtils, removeEmpty} = require('webpack-config-utils')
  const {ifProd, ifNotProd} = getIfUtils(env)
  return {
    entry: ['webpack/hot/poll?1000', './server/src/index'],
    watch: true,
    devtool: 'sourcemap',
    target: 'async-node',
    node: {
      __filename: true,
      __dirname: true
    },
    externals: [nodeExternals({whitelist: ['webpack/hot/poll?1000']})],
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [['env', {modules: false}], 'stage-0'],
                plugins: ['transform-regenerator', 'transform-runtime']
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: {
            loader: 'raw-loader'
          }
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          use: {
            loader: 'raw-loader'
          }
        }
      ]
    },
    plugins: removeEmpty([
      new ProgressBarPlugin(),
      new StartServerPlugin('index.js'),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      ifProd(
        new webpack.DefinePlugin({
          // <-- key to reducing React's size
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        })
      ),
      new webpack.DefinePlugin({
        'process.env': {BUILD_TARGET: JSON.stringify('server')}
      }),
      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      })
    ]),
    output: {path: path.join(__dirname, './server/dist'), filename: 'index.js'}
  }
}
