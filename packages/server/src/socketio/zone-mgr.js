import Zone from "./zone"
import zoneTemplates from "./zones"

export default () => {
  // mapping of all available zones
  const zones = new Map(zoneTemplates.map(c => [c.name, Zone(c)]))

  function removeClient(client) {
    zones.forEach(c => c.removeUser(client))
  }

  function getZoneByName(zoneName) {
    return zones.get(zoneName)
  }

  function serializeZones() {
    return Array.from(zones.values()).map(c => c.serialize())
  }

  return {
    removeClient,
    getZoneByName,
    serializeZones
  }
}
