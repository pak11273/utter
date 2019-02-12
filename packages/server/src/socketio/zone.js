export default ({id, zoneName, image}) => {
  const members = new Map()
  let zoneHistory = []

  function broadcastMessage(message) {
    console.log("message: ", message)
    console.log("members: ", members)
    members.forEach(m => m.emit("message", message))
  }

  function addEntry(entry) {
    zoneHistory = zoneHistory.concat(entry)
  }

  function getZoneHistory() {
    return zoneHistory.slice()
  }

  function addUser(zone) {
    members.set(zone.id, zone)
  }

  function removeUser(zone) {
    members.delete(zone.id)
  }

  function serialize() {
    return {
      id,
      zoneName,
      image,
      numMembers: members.size
    }
  }

  return {
    broadcastMessage,
    addEntry,
    getZoneHistory,
    addUser,
    removeUser,
    serialize
  }
}
