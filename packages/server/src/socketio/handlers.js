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
      `invalid zone name: ${zoneId}`
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

  function handleRegister(userName, callback) {
    if (!socketManager.isUserAvailable(userName))
      return callback("user is not available")

    const user = socketManager.getUserByName(userName)
    socketManager.registerSocket(socket, user)

    return callback(null, user)
  }

  function handleJoin(zoneId, callback) {
    const createEntry = () => ({event: `joined ${zoneId}`})

    handleEvent(zoneId, createEntry)
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

  function handleMessage(zoneId, message, callback) {
    const createEntry = () => ({message})
console.log('hello');
		console.log('ZONED ID: ', zoneId);
    handleEvent(zoneId, createEntry)
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
