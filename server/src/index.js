import config from '../dist/config/config.js'
import server from './server.js'
import logger from '../dist/util/logger'
import socketServer from './socketServer'

//TODO: create and use logger
server.listen(config.port, function() {
  logger.log('listening on port ' + config.port)
})

socketServer(server)
