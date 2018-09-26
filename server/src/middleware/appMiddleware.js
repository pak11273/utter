import cookieParser from 'cookie-parser'
import session from 'express-session'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import config from '../config/index.js'
import passport from 'passport'
import acl from '../acl'
import roles from '../acl/roles.js'
const MongoStore = require('connect-mongo')(session)

// webpack hmr imports - not necessary for production TODO:remove for production
// import webpack from 'webpack'
// import webpackMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpackConfig from '../../../webpack.config.js'
// const compiler = webpack(webpackConfig)

export default app => {
  app.use(cors())
  app.use(morgan('dev'))
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  mongoose.Promise = bluebird
  app.use(
    session({
      secret: 'addyourownsecretkey',
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({mongooseConnection: mongoose.connection})
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

  // hmr global middleware : turn this on for development
  // app.use(
  //   webpackMiddleware(compiler, {
  //     hot: true,
  //     publicPath: webpackConfig.output.publicPath,
  //     noInfo: true
  //   })
  // )
  // app.use(webpackHotMiddleware(compiler))

  console.log('mongo: ', config.db.url)
  mongoose.connect(
    config.db.url,
    {useNewUrlParser: true}
  )

  mongoose.connection.on('connected', function(test) {
    // acl.init()
  })
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
