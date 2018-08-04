import config from '../dist/config/index.js'
import server from './server.js'
import logger from '../dist/util/logger'
import socketServer from './socketServer'

const env = process.env.NODE_ENV || 'empty'
console.log('The current ENV: ', env)

//TODO: create and use logger
server.listen(config.port, function() {
  logger.log('listening on port ' + config.port)
})

socketServer(server)
