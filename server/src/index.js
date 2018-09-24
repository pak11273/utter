import config from './config/index.js'
import server from './server.js'
import logger from './util/logger'
import socketServer from './socketServer'

const env = process.env.NODE_ENV || 'empty'
console.log('The current ENV: ', env)

//TODO: create and use logger
server.listen(config.port, function() {
  logger.log('listening on port ' + config.port)
})

socketServer(server)

let currentApp = server

// if (module.hot) {
//   module.hot.accept(['./server'], () => {
//     server.removeListener('request', currentApp)
//     server.on('request', app)
//     currentApp = app
//   })
// }
