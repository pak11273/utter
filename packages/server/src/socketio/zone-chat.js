export default socketio => {
  socketio.on("connection", socket => {
    console.log("User connected")

    socket.on("createMessage", data => {
      console.log("val: ", data)
    })
  })
}
