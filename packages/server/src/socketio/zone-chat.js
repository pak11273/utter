export default io => {
  io.on("connection", socket => {
    console.log("User connected to chat")

    socket.on("join", (params, cb) => {
      console.log("params: ", params)
      socket.join(params.zoneName)
      cb()
    })

    socket.on("createMessage", msg => {
      console.log("val: ", msg)
      io.to(msg.zoneName).emit("newMessage", {
        msg: msg.msg,
        zoneName: msg.zoneName
      })
    })
  })
}
