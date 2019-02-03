const userTemplates = require("./users")

export default () => {
  // mapping of all connected sockets
  const sockets = new Map()

  function addSocket(socket) {
    sockets.set(socket.id, {socket})
  }

  function registerSocket(socket, user) {
    sockets.set(socket.id, {socket, user})
  }

  function removeSocket(socket) {
    sockets.delete(socket.id)
  }

  function getAvailableUsers() {
    const usersTaken = new Set(
      Array.from(sockets.values())
        .filter(c => c.user)
        .map(c => c.user.name)
    )
    return userTemplates.filter(u => !usersTaken.has(u.name))
  }

  function isUserAvailable(userName) {
    return getAvailableUsers().some(u => u.name === userName)
  }

  function getUserByName(userName) {
    return userTemplates.find(u => u.name === userName)
  }

  function getUserBySocketId(socketId) {
    return (sockets.get(socketId) || {}).user
  }

  return {
    addSocket,
    registerSocket,
    removeSocket,
    getAvailableUsers,
    isUserAvailable,
    getUserByName,
    getUserBySocketId
  }
}
