import io from 'socket.io'

export default server => {
  const socketServer = io(server)

  socketServer.on('connection', socket => {
    console.log('User ' + socket.id + ' connected')

    socket.emit('connection', {nsp: 'global'})

    socket.on('create room', room => {
      console.log('room is being created')
      socket.join(room)
      socket.emit('create room', 'blah fah goa')
    })
    // socket.on('message', body => {
    //   socketServer.emit('message', {
    //     body
    //   })
    // })

    socket.on('disconnect', socket => {
      console.log('user disconnected')
      socketServer.emit('disconnect', {status: 'disconnected'})
    })
  })

  const nspInterface = nsp => {
    nsp.on('connection', socket => {
      socket.join('Lobby')
      console.log(`a user connected to the ${nsp.name} channel`)
      const count = Object.keys(nsp.sockets).length
      console.log(`${nsp.name} count: `, count)

      socket.on('create room', function(room) {
        socket.join(room)
        console.log('room ' + room + 'was created.')
        console.log('clients: ', nsp.clients())
        console.log('sockets:', socket.rooms)
      })

      socket.on('disconnect', () => {
        console.log(`a user disconnected from the ${nsp.name} channel`)
      })

      socket.on('get rooms', list => {
        console.log('get rooms was called')
        console.log('sockets:', socket.rooms)
        // socket.emit('get rooms', socket.adapter.rooms)
        socket.emit('get rooms', socket.rooms)
      })
    })
  }

  // // namespaces
  const kor_for_eng = socketServer.of('/kor_for_eng')
  const span_for_eng = socketServer.of('/span_for_eng')

  nspInterface(kor_for_eng)
  nspInterface(span_for_eng)
}
