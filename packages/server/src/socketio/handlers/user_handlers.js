export const add_contact_handler = socket => (zone, cb) => {
  socket.join(zone.username)

  cb()
}
