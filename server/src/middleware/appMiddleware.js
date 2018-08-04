import cookieParser from 'cookie-parser'
import session from 'express-session'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import bluebird from 'bluebird'
import config from '../../dist/config/index.js'
import passport from 'passport'
const MongoStore = require('connect-mongo')(session)
import node_acl from 'acl'

// webpack hmr imports - not necessary for production TODO:remove for production
// import webpack from 'webpack'
// import webpackMiddleware from 'webpack-dev-middleware'
// import webpackHotMiddleware from 'webpack-hot-middleware'
// import webpackConfig from '../../../webpack.config.js'
// const compiler = webpack(webpackConfig)

module.exports = app => {
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

  mongoose.connect(config.db.url, {useNewUrlParser: true})

  // ref: https://stackoverflow.com/questions/22827493/running-node-acl-with-mongoose-on-expressjs
  mongoose.connection.on('connected', function(error) {
    if (error) throw error
    //you must set up the db when mongoose is connected or your will not be able to write any document into it
    const mongodbBackend = new node_acl.mongodbBackend(
      mongoose.connection.db,
      'acl_'
    )
    // ref: https://gist.github.com/danwit/11307969
    const logger = () => {
      return {
        debug: function(msg) {
          console.log('-DEBUG-', msg)
        }
      }
    }

    const acl = new node_acl(mongodbBackend, logger())

    set_roles()
    set_routes()

    function set_roles() {
      // Define roles, resources and permissions
      acl.allow([
        {
          roles: 'admin',
          allows: [
            {resources: '/secret', permissions: 'create'},
            {resources: '/topsecret', permissions: '*'}
          ]
        },
        {
          roles: 'User',
          allows: [{resources: '/secret', permissions: 'get'}]
        },
        {
          roles: 'guest',
          allows: []
        }
      ])

      // Inherit roles
      //  Every user is allowed to do what guests do
      //  Every admin is allowed to do what users do
      acl.addRoleParents('user', 'guest')
      acl.addRoleParents('admin', 'user')
    }

    // Defining routes ( resources )
    function set_routes() {
      // Simple overview of granted permissions
      app.get('/info', function(request, response, next) {
        acl.allowedPermissions(
          get_user_id(),
          ['/info', '/secret', '/topsecret'],
          function(error, permissions) {
            response.json(permissions)
          }
        )
      })

      // Only for users and higher
      app.get('/secret', acl.middleware(1, get_user_id), function(
        request,
        response,
        next
      ) {
        response.send('Welcome Sir!')
      })

      // Only for admins
      app.get('/topsecret', acl.middleware(1, get_user_id), function(
        request,
        response,
        next
      ) {
        response.send('Hi Admin!')
      })

      // Setting a new role
      app.get('/allow/:user/:role', function(request, response, next) {
        acl.addUserRoles(request.params.user, request.params.role)
        response.send(request.params.user + ' is a ' + request.params.role)
      })

      // Unsetting a role
      app.get('/disallow/:user/:role', function(request, response, next) {
        acl.removeUserRoles(request.params.user, request.params.role)
        response.send(
          request.params.user + ' is not a ' + request.params.role + ' anymore.'
        )
      })
    }

    // Provide logic for getting the logged-in user
    //  This is a job for your authentication layer
    function get_user_id(request, response) {
      return 'bob'
    }
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
