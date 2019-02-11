import ZoneFunctions from "./zone"
import ZoneModel from "../api/zone/zone-model"
import zonesFromDB from "./zones"

export default async () => {
  // mapping of all available zones
  const zones = await ZoneModel.find({}).then(doc => {
    // 1. result is an array of zone objects
    // 2. each object will be passed to the ZoneFunctions module, where zoneName and image is extracted
    return new Map(doc.map(c => [c.id, ZoneFunctions(c)]))
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
