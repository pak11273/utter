import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"
import Zone from "./zone-model"
import cuid from "cuid"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
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

const zoneCreate = async (_, args, {redis, url}, info) => {
  //TODO can't have duplicate zone names
  const {input} = args
  console.log("ingput: ", input)

  redis.hmset(
    cuid(),
    [
      "app",
      input.app,
      "ageGroup",
      input.ageGroup,
      "owner",
      input.owner,
      "resource",
      input.resources,
      "zoneImage",
      imput.zoneImage,
      "zoneName",
      input.zoneName,
      "zoneDescription",
      input.zoneDescription
    ],
    (err, reply) => {
      if (err) {
        return err
      }
      console.log("reply: ", reply)
      return reply
    }
  )
  /* const redisToken = args.input.token */
  /* const redisKey = `${confirmEmailPrefix}${redisToken}` */
  /* const zoneId = await redis.set(input.key) */

  /* const zone = await Zone.create(input) */
  /* zone.id = zone._id */
  return zone
}

const getZoneLevels = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.owner = ctx.user
}

const getZones = async (_, args, {redis, url}, info) => {
  console.log("ARGS: ", args)

  /* let id = args.input.id */

  let id = "blah"

  redis.hgetall(id, (err, obj) => {
    if (!obj) {
      return "No zones exist yet."
    } else {
      obj.id = id
      return [{user: obj}]
    }
  })
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
  },
  Zone: {
    async owner(zone) {
      const populated = await zone.populate("owner").execPopulate()

      return populated.owner
    }
  }
}
