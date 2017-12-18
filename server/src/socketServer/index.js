import io from 'socket.io'
// import monitorio from 'monitor.io'

export default server => {
  const socketServer = io(server)
  // socketServer.use(monitorio({port: 8000}))

  socketServer.on('connection', socket => {
    console.log('User ' + socket.id + ' connected')

    socket.emit('connection', {nsp: 'global'})

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

      socket.on('create room', function(room, fn) {
        console.log('room ' + room + ' was created.')
        fn(room)
      })

      socket.on('join room', function(room, fn) {
        socket.join(room)
        console.log(room + ' was joined.')
        fn(room)
      })

      socket.on('disconnect', () => {
        console.log(`a user disconnected from the ${nsp.name} channel`)
      })

      socket.on('get rooms', function(data, fn) {
        console.log('get rooms was called')
        // socket.emit('get rooms', socket.adapter.rooms)
        fn(socket.adapter.rooms)
      })

      // socket.on('get rooms', list => {
      //   console.log('get rooms was called')
      //   socket.emit('get rooms', socket.adapter.rooms)
      // })

      socket.on('send msg', (body, fn) => {
        socket.to(body.room).emit('receive msg', body)
        fn(body.msg)
      })

      // console.log('a msg was received')
      // nsp.to(msg.room).emit('send msg', msg.msg)
      // socket.emit('send msg', msg.msg)

      // admin api
      // creator is auto matically the admin from the start
      // TODO: creator can pick a proxy admin
      // TODO: if creator disconnects then either a person who was previously picked by the creator becomes the admin else a random moderator or room member.
      // TODO: 'ban user': kicks a user from the room
      // io.sockets.to(roomID).emit('ban user', { userID: uid });
      // clientside:
      //
      // if (data.removedUserID == myUserID)
      //     alert('You have been kicked by moderator');
      //     else
      //     removeUserFromList(userID);
      //
      //  ***You should not have the client emit a message that he is leaving, as malicious users could write a client that ignores banning.
      //
      // TODO: 'make private': makes room not available to the public
      // TODO: 'make public': makes room available to the public
    })
  }

  // // namespaces
  const kor_for_eng = socketServer.of('/kor_for_eng')
  const span_for_eng = socketServer.of('/span_for_eng')

  nspInterface(kor_for_eng)
  nspInterface(span_for_eng)
}
