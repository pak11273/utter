import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import config from '../../dist/config/config.js'

// webpack hmr imports - not necessary for production TODO:remove for production
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../../webpack.config.js'
const compiler = webpack(webpackConfig)

module.exports = app => {
  app.use(cors())
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  mongoose.Promise = bluebird

  // hmr global middleware : turn this on for development
  // app.use(
  //   webpackMiddleware(compiler, {
  //     hot: true,
  //     publicPath: webpackConfig.output.publicPath,
  //     noInfo: true
  //   })
  // )
  // app.use(webpackHotMiddleware(compiler))

  mongoose.connect(config.db.url)
}

// cors preflight
// alternative cors code
// app.use(function(req, res, next) {
//       res.header("Access-Control-Allow-Origin", "*");
//       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       next();
// });

// cors preflight using npm cors
// app.use(cors());
// app.options("*", cors());

// api
// *if using cors, add as 1st middleware func
