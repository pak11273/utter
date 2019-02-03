import io from "socket.io"
import path from "path"
import ss from "socket.io-stream"

export default server => {
  const socketServer = io(server)

  socketServer.on("connection", socket => {
    console.log("User " + socket.id + " connected")

    socket.emit("connection", {nsp: "global"})

    socket.on("disconnect", socket => {
      console.log("user disconnected")
      socketServer.emit("disconnect", {status: "disconnected"})
    })
  })

  const nspInterface = nsp => {
    nsp.on("connection", socket => {
      // socket.zones = {}
      socket.join("Lobby")
      const count = Object.keys(nsp.sockets).length

      socket.on("create zone", function(meta, fn) {
        console.log("meta " + meta.title + " was created.")
        fn(meta)
      })

      socket.on("join zone", function(zone, fn) {
        const body = {}
        socket.join(zone)
        if (zone !== "Lobby") {
          socket.leave("Lobby")
          body.msg = "someone has joined the zone. Practice a Greeting!"
          body.author = "chatbot"
          socket.to(zone).emit("receive msg", body)
        }
        fn(zone)
      })

      socket.on("disconnect", () => {
        console.log(`a user disconnected from the ${nsp.name} channel`)
      })

      socket.on("get zones", function(data, fn) {
        fn(socket.adapter.zones)
      })

      socket.on("send audio blob", (data, fn) => {
        socket.to(data.audio.zone).emit("receive audio blob", data)
        fn(data)
      })

      socket.on("send msg", (body, fn) => {
        socket.broadcast.to(body.zone).emit("receive msg", body)
        fn(body.msg)
      })

      ss(socket).on("send file", (stream, data) => {
        var filename = path.basename(data.name)
        stream.pipe(fs.createWriteStream(filename))
      })

      socket.on("send zone meta", (meta, fn) => {
        socket.to(meta.zone.title).emit("receive zone meta", meta)
        fn(meta)
      })

      // admin api
      // creator is auto matically the admin from the start
      // TODO: creator can pick a proxy admin
      // TODO: if creator disconnects then either a person who was previously picked by the creator becomes the admin else a random moderator or zone member.
      // TODO: 'ban user': kicks a user from the zone
      // io.sockets.to(zoneID).emit('ban user', { userID: uid });
      // clientside:
      //
      // if (data.removedUserID == myUserID)
      //     alert('You have been kicked by moderator');
      //     else
      //     removeUserFromList(userID);
      //
      //  ***You should not have the client emit a message that he is leaving, as malicious users could write a client that ignores banning.
      //
      // TODO: 'make private': makes zone not available to the public
      // TODO: 'make public': makes zone available to the public
    })
  }

  // // namespaces
  const kor_for_eng = socketServer.of("/kor_for_eng")
  const span_for_eng = socketServer.of("/span_for_eng")
  const french_for_eng = socketServer.of("/french_for_eng")

  nspInterface(kor_for_eng)
  nspInterface(span_for_eng)
  nspInterface(french_for_eng)
}
