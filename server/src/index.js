import app from './server.js'
import config from '../dist/config/config.js'
import logger from '../dist/util/logger'

// TODO: create and use logger
app.listen(config.port, function() {
  logger.log('listening on port ' + config.port)
})
