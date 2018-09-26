<<<<<<< HEAD
import http from 'http'
import config from './config/index.js'
import app from './server.js'
=======
import config from './config/index.js'
import server from './server.js'
>>>>>>> origin/master
import logger from './util/logger'
import socketServer from './socketServer'

const server = http.createServer(app)
let currentApp = app

const env = process.env.NODE_ENV || 'empty'
console.log('The current ENV: ', env)

server.listen(config.port, function() {
  logger.log('listening on port ' + config.port)
})

socketServer(server)

<<<<<<< HEAD
=======
let currentApp = server

>>>>>>> origin/master
if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp)
    server.on('request', app)
    currentApp = app
  })
}
