function makeHandleEvent(socket, socketManager, zoneManager) {
  function ensureExists(getter, rejectionMessage) {
    return new Promise(function(resolve, reject) {
      const res = getter()
      return res ? resolve(res) : reject(rejectionMessage)
    })
  }

  function ensureValidZone(zoneId) {
    return ensureExists(
      () => zoneManager.getZoneById(zoneId),
      `invalid zone id: ${zoneId}`
    )
  }

  function ensureValidZoneAndUserSelected(zoneId) {
    return Promise.all([ensureValidZone(zoneId)]).then(([zone, user]) =>
      Promise.resolve({zone, user})
    )
  }

  function handleEvent(zoneId, createEntry) {
    return ensureValidZoneAndUserSelected(zoneId).then(function({zone, user}) {
      // append event to zone history
      const entry = {user, ...createEntry()}
      zone.addEntry(entry)

      // notify other sockets in zone
      zone.broadcastMessage({zone: zoneId, ...entry})
      return zone
    })
  }

  return handleEvent
}

export default (socket, socketManager, zoneManager) => {
  const handleEvent = makeHandleEvent(socket, socketManager, zoneManager)

  function handleRegister(userName, cb) {
    if (!socketManager.isUserAvailable(userName))
      return cb("user is not available")

    const user = socketManager.getUserByName(userName)
    socketManager.registerSocket(socket, user)

    return cb(null, user)
  }

  function handleJoin(zoneId, cb) {
    const createEntry = () => ({event: `has joined the zone.`})

    handleEvent(zoneId, createEntry)
      .then(function(zone) {
        // add member to zone
        console.log("zone: ", zone)
        zone.addUser(socket)
        console.log("here???")
        // send zone history to socket
        cb(null, zone.getZoneHistory())
      })
      .catch(cb)
  }

  function handleLeave(zoneId, cb) {
    const createEntry = () => ({event: `left the zone.`})

    handleEvent(zoneId, createEntry)
      .then(function(zone) {
        // remove member from zone
        zone.removeUser(socket.id)

        cb(null)
      })
      .catch(cb)
  }

  function handleMessage({zoneId, message} = {}, cb) {
    const createEntry = () => ({message})
    handleEvent(zoneId, createEntry)
      .then(() => cb(null))
      .catch(cb)
  }

  function handleGetZones(_, cb) {
    return cb(null, zoneManager.serializeZones())
  }

  function handleGetAvailableUsers(_, cb) {
    return cb(null, socketManager.getAvailableUsers())
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
