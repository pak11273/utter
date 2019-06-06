const Users = new SocketUsers()
import SocketUsers from "../../socketio/users.js"

export const join_handler = (io, socket) => (zone, cb) => {
  socket.join(zone.zoneId)

  Users.addUserData(socket.id, zone.zoneId, zone.zoneName, zone.username)

  io.to(zone.zoneId).emit("usersList", Users.getUsersList(zone.zoneId))

  cb()
}
