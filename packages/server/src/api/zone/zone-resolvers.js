import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"
import Course from "../course/course-model.js"
import User from "../user/user-model.js"
import Zone from "./zone-model"
import {io} from "../../index.js"

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

const zoneDelete = async (_, {_id}, {redis, req}) => {
  try {
    if (!req.session || !req.session.userId) {
      throw new Error("Not authenticated.")
    }
    const zone = await Zone.findOneAndDelete({owner: req.session.userId}).exec()

    if (!zone) {
      throw new Error("We could not find this zone.")
    }

    if (zone) {
      redis.del(zone._id)
      redis.srem("ZONES", zone._id)
      return true
    }
  } catch (err) {
    return err
  }
}

const zoneUpdate = (_, {input}) => {
  const {id, ...update} = input
  return Zone.findByIdAndUpdate(id, update, {new: true}).exec()
}

const zoneCreate = async (_, {input}, {req, redis}, info) => {
  try {
    if (!req.session || !req.session.userId) {
      throw new Error("Not authenticated.")
    }

    // prohibit multiple hosting
    const findZone = await Zone.find({owner: req.session.userId})
    if (findZone[0] instanceof mongoose.Document) {
      throw new Error("You can only host one zone at a time.")
    }

    const user = await User.findById(req.session.userId, (err, res) => {
      if (err) return err
      return res
    })

    const course = await Course.findById(input.course, (err, res) => {
      if (err) return err
      return res
    })

    const newZone = new Zone({
      app: input.app,
      course: course._id,
      zoneName: course.zoneName,
      courseLevel: +input.courseLevel,
      ageGroup: input.ageGroup,
      owner: input.owner,
      password: input.password,
      private: input.private,
      zoneName: input.zoneName,
      zoneDescription: input.zoneDescription,
      teachingLang: course.teachingLang,
      usingLang: course.usingLang
    })

    const zone = await newZone.save()

    let createdZone

    const zoneId = zone._doc._id.toString()

    // Add this zone in redis to the zones set
    redis.sadd("ZONES", zoneId)

    createdZone = {
      ...zone._doc,
      _id: zoneId,
      owner: userById.bind(this, zone._doc.owner),
      course: Course.findById(input.course)
    }

    return createdZone
  } catch (err) {
    throw err
  }
}

const getZoneLevels = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.owner = ctx.user
}

const getZones = async (_, {input}, {redis, ctx}, info) => {
  const options = {
    select:
      "zoneName zoneDescription owner.username app courseLevel usingLang teachingLang ageGroup members maxMembers",
    lean: true,
    page: input.page,
    limit: 24,
    populate: [{path: "owner", select: "username"}],
    collation: {
      locale: "en"
    }
  }

  // we don't need page or cursor in our query
  delete input.page
  var query = {}

  for (var key in input) {
    input[key] !== "" ? (query[key] = input[key]) : null
  }

  // $text search
  input.searchInput
    ? (query = {...query, ...{$text: {$search: input.searchInput}}})
    : null

  /* query = {$"and": searchArr} */

  // fuzzy search on searchInput with regex // shelved because its too slow
  /* input.searchInput */
  /*   ? (query[input.selectionBox] = new RegExp( */
  /*       escapeRegex(input.searchInput), */
  /*       "gi" */
  /*     ))   : null */
  /* {$text: {$search: searchString}} */

  delete query.searchInput
  delete query.selectionBox

  /* end fuzzy search */

  // get member count for each zone

  return await Zone.paginate(query, options, (err, result) => {
    const merged = result.docs.map(async item => {
      const members = await redis.smembers(item._id)
      item.members = members.length
      return item
    })

    return Promise.all(merged).then(docs => {
      return {
        page: result.page,
        zones: docs,
        more: result.hasNextPage
      }
    })
  })
}

const rezone = async (_, __, {redis, req}, info) => {
  // build query object
  const query = {}
  query.owner = req.session
  const hostedZone = await Zone.findOne({owner: req.session.userId})
    .populate([
      {path: "owner", select: "username"},
      {path: "course", select: "_id"}
    ])
    .select(
      "_id app courseLevel ageGroup zoneName zoneDescription password private teachingLang usingLang"
    )
    .exec()

  redis.sadd(hostedZone._id, hostedZone.owner.username)

  return hostedZone
}

export const zoneResolvers = {
  Query: {
    getZones,
    getZone,
    getZoneLevels,
    rezone
  },
  Mutation: {
    zoneDelete,
    zoneUpdate,
    zoneCreate
  }
}
