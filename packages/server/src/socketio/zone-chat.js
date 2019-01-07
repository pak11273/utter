export default socketio => {
  socketio.on("connection", socket => {
    console.log("User connected")
  })
}
