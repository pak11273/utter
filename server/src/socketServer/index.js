import io from 'socket.io'

let onlineTotal = 0
let span_for_eng_Total = 0
let kor_for_eng_Total = 0

export default server => {
  const socketServer = io(server)

  socketServer.on('connection', socket => {
    console.log('User ' + socket.id + ' connected')
    console.log('online total: ', ++onlineTotal)

    socket.on('message', body => {
      console.log('main body: ', body)
      socket.broadcast.emit('message', {
        body
      })
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
      console.log('online total: ', --onlineTotal)
    })
  })

  const span_for_eng = socketServer.of('/span_for_eng')

  span_for_eng.on('connection', socket => {
    console.log('a user connected to the span_for_eng channel')

    socket.on('message', body => {
      console.log('message received: ', body)
      socket.broadcast.emit('message', {
        body
      })
    })
  })

  span_for_eng.on('disconnect', () => {
    console.log('a user disconnected from the span_for_eng channel')
  })

  const kor_for_eng = socketServer.of('/kor_for_eng')

  kor_for_eng.on('connection', socket => {
    console.log('a user connected to the kor_for_eng channel')

    kor_for_eng.on('message', body => {
      kor_for_eng.emit('message', {
        body
      })
    })

    kor_for_eng.on('disconnect', () => {
      console.log('a user disconnected from the kor_for_eng channel')
    })
  })
}
