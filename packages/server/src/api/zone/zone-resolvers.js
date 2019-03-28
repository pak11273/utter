import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"
import User from "../user/user-model.js"
import Zone from "./zone-model"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const userById = async userId => {
  try {
    const user = await User.findById(userId).lean()
    if (user) {
      return {
        ...user,
        createdZones: zonesById.bind(this, user.createdZones)
      }
    }
    return {
      username: ""
    }
  } catch (err) {
    throw err
  }
}

const zonesById = async zoneIds => {
  try {
    const zones = await Zone.find({_id: {$in: zoneIds}}).lean()
    return zones.map(zone => {
      return {
        ...zone,
        owner: userById.bind(this, zone.owner)
      }
    })
  } catch (err) {
    throw err
  }
}

const getZone = async (_, {zoneId}, {user}) => {
  const zone = await Zone.findById(zoneId).exec()
  if (!zone) {
    throw new Error("Cannot find zone with id")
  }

  return zone
}

const zoneDelete = async (_, {id}, ctx) => {
  const zone = await Zone.findById(id).exec()
  /* Zone.findOneAndDelete({owner: user._id && id: id}) { */
  /* } */

  if (!zone) {
    throw new Error("No zone found.")
  }

  if (zone.owner === id) {
    // TODO: delete zone
  }

  return zone
}

const zoneUpdate = (_, {input}) => {
  const {id, ...update} = input
  return Zone.findByIdAndUpdate(id, update, {new: true}).exec()
}

const zoneCreate = async (_, args, ctx, info) => {
  //TODO can't have duplicate zone names
  const {input} = args
  console.log("ingput: ", input)
  const zone = await Zone.create(input)

  const newZone = new Zone({
    app: input.app,
    courseLevel: input.courseLevel,
    ageGroup: input.ageGroup,
    owner: input.owner,
    zoneName: input.zoneName,
    zoneDescription: input.zoneDescription,
    teachingLang: input.teachingLang,
    usingLang: input.usingLang
  })

  let createdZone

  /* zone.id = zone._id */

  createdZone = {
    ...zone._doc,
    _id: zone._doc._id.toString(),
    owner: userById.bind(this, zone._doc.owner)
  }

  console.log("zone: ", createdZone)
  return createdZone
}

const getZoneLevels = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.owner = ctx.user
}

const getZones = async (_, args, ctx, info) => {
  console.log("ARGS: ", args)
  var input = args.input
  if (input.searchInput || input.selectionBox) {
    input[input.selectionBox] = input.searchInput
    delete input.searchInput
    delete input.selectionBox
  }
  var query = {}
  for (var key in input) {
    input[key] !== "" ? (query[key] = input[key]) : null
  }

  query.title
    ? (query.title = new RegExp(escapeRegex(query.title), "gi"))
    : null

  if (query.owner) {
    query.owner = await User.findOne({username: query.owner}, (err, docs) => {
      if (err) {
        throw err
      }
      if (!isEmpty(docs)) {
        var owner = docs._id
        query.owner = docs._id
      }
    })
  }

  query.resource
    ? (query.resource = new RegExp(escapeRegex(query.resource), "gi"))
    : null

  // type cast id because $lt is not the same in aggregate vs query
  /* var cursorObj = mongoose.Types.ObjectId(query.cursor) */

  if (query.cursor) {
    query._id = {$gt: query.cursor || null}
    delete query.cursor
  }

  try {
    let zones = await Zone.find(query)
      .lean()
      .sort({_id: -1})
      .limit(12)

    const convertedZones = zones.map(zone => {
      return {
        ...zone,
        owner: userById.bind(this, zone.owner)
      }
    })
    return {zones: convertedZones, cursor: ""}

    if (isEmpty(zones)) {
      return {zones: [], cursor: "done"}
    } else {
      cursor = zones[zones.length - 1]._id
      return {zones: zones, cursor}
    }
  } catch (err) {
    throw err
  }
}

export const zoneResolvers = {
  Query: {
    getZones,
    getZone,
    getZoneLevels
  },
  Mutation: {
    zoneDelete,
    zoneUpdate,
    zoneCreate
  }
  /* Zone: { */
  /*   async owner(zone) { */
  /*     const populated = await zone.populate("owner").execPopulate() */

  /*     return populated.owner */
  /*   } */
  /* } */
}
