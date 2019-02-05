function makeHandleEvent(socket, socketManager, zoneManager) {
  function ensureExists(getter, rejectionMessage) {
    return new Promise(function(resolve, reject) {
      const res = getter()
      return res ? resolve(res) : reject(rejectionMessage)
    })
  }

  function ensureUserSelected(socketId) {
    return ensureExists(
      () => socketManager.getUserBySocketId(socketId),
      "select user first"
    )
  }

  function ensureValidZone(zoneName) {
    return ensureExists(
      () => zoneManager.getZoneByName(zoneName),
      `invalid zone name: ${zoneName}`
    )
  }

  function ensureValidZoneAndUserSelected(zoneName) {
    return Promise.all([
      ensureValidZone(zoneName),
      ensureUserSelected(socket.id)
    ]).then(([zone, user]) => Promise.resolve({zone, user}))
  }

  function handleEvent(zoneName, createEntry) {
    return ensureValidZoneAndUserSelected(zoneName).then(function({
      zone,
      user
    }) {
      // append event to zone history
      const entry = {user, ...createEntry()}
      zone.addEntry(entry)

      // notify other sockets in zone
      zone.broadcastMessage({zone: zoneName, ...entry})
      return zone
    })
  }

  return handleEvent
}

export default (socket, socketManager, zoneManager) => {
  const handleEvent = makeHandleEvent(socket, socketManager, zoneManager)

  function handleRegister(userName, callback) {
    if (!socketManager.isUserAvailable(userName))
      return callback("user is not available")

    const user = socketManager.getUserByName(userName)
    socketManager.registerSocket(socket, user)

    return callback(null, user)
  }

  function handleJoin(zoneName, callback) {
    const createEntry = () => ({event: `joined ${zoneName}`})

    handleEvent(zoneName, createEntry)
      .then(function(zone) {
        // add member to zone
        zone.addUser(socket)

        // send zone history to socket
        callback(null, zone.getZoneHistory())
      })
      .catch(callback)
  }

  function handleLeave(zoneName, callback) {
    const createEntry = () => ({event: `left ${zoneName}`})

    handleEvent(zoneName, createEntry)
      .then(function(zone) {
        // remove member from zone
        zone.removeUser(socket.id)

        callback(null)
      })
      .catch(callback)
  }

  function handleMessage({zoneName, message} = {}, callback) {
    const createEntry = () => ({message})

    handleEvent(zoneName, createEntry)
      .then(() => callback(null))
      .catch(callback)
  }

  function handleGetZones(_, callback) {
    return callback(null, zoneManager.serializeZones())
  }

  function handleGetAvailableUsers(_, callback) {
    return callback(null, socketManager.getAvailableUsers())
  }

  function handleDisconnect() {
    // remove user profile
    socketManager.removeSocket(socket)
    // remove member from all zones
    socketManager.removeSocket(socket)
  }

  return {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetZones,
    handleGetAvailableUsers,
    handleDisconnect
  }
}