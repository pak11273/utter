import isEmpty from "lodash/isEmpty"
import ZoneFunctions from "./zone"
import ZoneModel from "../api/zone/zone-model"
import zonesFromDB from "./zones"

export default async () => {
  // mapping of all available zones

  const queryDB = async (id = null) => {
    const doc = await ZoneModel.find({_id: id})
      .limit(12)
      .sort({_id: -1})
      .exec()
    if (isEmpty(doc)) {
      console.log("no zones created.")
    } else {
      return new Map(doc.map(c => [c.id, ZoneFunctions(c)]))
    }
  }

  const removeClient = client => {
    zones.forEach(c => c.removeUser(client))
  }

  const getZoneById = async id => {
    const zones = await queryDB(id)
    return zones.get(id)
  }

  const serializeZones = async () => {
    const zones = await queryDB()
    return Array.from(zones.values()).map(c => c.serialize())
  }

  return {
    removeClient,
    getZoneById,
    serializeZones
  }
}
