import io from 'socket.io'

export default server => {
  const socketServer = io(server)

  socketServer.on('connection', socket => {
    console.log('a user connected')

    socket.on('message', body => {
      socket.broadcast.emit('message', {
        body
      })
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}
