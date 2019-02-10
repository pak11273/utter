import Zone from "./zone"
import zonesFromDB from "./zones"

export default async () => {
  // mapping of all available zones
  const zones = await zonesFromDB.then(doc => {
    // 1. result is an array of zone objects
    // 2. each object will be passed to the Zone module, where zoneName and image is extracted
    return new Map(doc.map(c => [c.id, Zone(c)]))
  })

  function removeClient(client) {
    zones.forEach(c => c.removeUser(client))
  }

  function getZoneById(id) {
    return zones.get(id)
  }

  function serializeZones() {
    return Array.from(zones.values()).map(c => c.serialize())
  }

  return {
    removeClient,
    getZoneById,
    serializeZones
  }
}
