import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"
import Zone from "./zone-model"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const getZone = async (_, {zoneId}, {user}) => {
  console.log("zoneId: ", zoneId)
  const zone = await Zone.findById(zoneId).exec()
  if (!zone) {
    throw new Error("Cannot find zone with id")
  }

  return zone
}

const zoneDelete = async (_, {id}, ctx) => {
  console.log("id: ", id)
  const zone = await Zone.findById(id).exec()
  /* Zone.findOneAndDelete({zoneAuthor: user._id && id: id}) { */
  /* } */

  if (!zone) {
    throw new Error("No zone found.")
  }

  if (zone.zoneAuthor === id) {
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
  console.log("input:", input)
  input.zoneAuthor = ctx.user
  const zone = await Zone.create(input)
  zone.id = zone._id
  console.log("zone: ", typeof zone)
  return zone
}

const getZoneLevels = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.zoneAuthor = ctx.user
}

const getCreatedZones = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.zoneAuthor = ctx.user
  // end query object

  /* // TODO: HOTFIX, using a fake zoneAuthor, delete this after testing */
  /* query.zoneAuthor = "5b9012f043aa4329f187f01a" */
  /* end */

  if (args.cursor) {
    // type cast id, $lt is not the same in aggregate vs query
    var cursorObj = mongoose.Types.ObjectId(args.cursor)
    // add to query object
    var cursor = cursorObj
    query._id = {$lt: cursor}
  }

  let result = await Zone.find(query)
    .limit(3)
    .sort({_id: -1})
    .exec()

  if (isEmpty(result)) {
    return {zones: [], cursor: "done"}
  } else {
    cursor = result[result.length - 1]._id
    return {zones: result, cursor}
  }
}

const getZones = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  var zoneName, zoneRef, zoneAuthor

  args.title
    ? (query.zoneName = new RegExp(escapeRegex(args.title), "gi"))
    : null

  args.ref ? (query.zoneRef = new RegExp(escapeRegex(args.ref), "gi")) : null

  if (args.author) {
    var zoneAuthor = await Zone.findByUsername(args.author, (err, docs) => {
      if (err) {
        // console.log doesn't work here
      }
      if (!isEmpty(docs)) {
        var zoneAuthor = docs._id
        query.zoneAuthor = zoneAuthor
      }
    })
  }

  args.usingLang
    ? (query.usingLang = new RegExp(escapeRegex(args.usingLang), "gi"))
    : null

  args.teachingLang
    ? (query.teachingLang = new RegExp(escapeRegex(args.teachingLang), "gi"))
    : null
  // end query object

  if (args.cursor) {
    // type cast id, $lt is not the same in aggregate vs query
    var cursor = mongoose.Types.ObjectId(args.cursor)
    // add to query object
    query._id = {$lt: cursor}
  }

  let result = await Zone.find(query)
    .limit(3)
    .sort({_id: -1})
    .exec()

  if (isEmpty(result)) {
    console.log("done")
    return {zones: [], cursor: "done"}
  } else {
    cursor = result[result.length - 1]._id
    return {zones: result, cursor}
  }
}

export const zoneResolvers = {
  Query: {
    getCreatedZones,
    getZones,
    getZone,
    getZoneLevels
  },
  Mutation: {
    zoneDelete,
    zoneUpdate,
    zoneCreate
  },
  Zone: {
    async zoneAuthor(zone) {
      const populated = await zone.populate("zoneAuthor").execPopulate()

      return populated.zoneAuthor
    }
  }
}
