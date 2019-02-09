import Zone from "./zone"
import zonesFromDB from "./zones"

export default async () => {
  // mapping of all available zones
  const result = await zonesFromDB.then(doc => {
    return doc
  })

  const zones = new Map(result.map(c => [c.id, Zone(c)]))

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
