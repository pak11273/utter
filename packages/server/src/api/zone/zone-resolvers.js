import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"
import Course from "../course/course-model.js"
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
  try {
    if (!ctx.isAuth) {
      throw new Error("You need to be registered to create a course.")
    }

    const userId = ctx.req.token._id

    const user = await User.findById(userId, (err, res) => {
      if (err) return err
      return res
    })

    const {input} = args

    const newZone = new Zone({
      app: input.app,
      course: input.course,
      courseLevel: input.courseLevel,
      ageGroup: input.ageGroup,
      owner: input.owner,
      zoneName: input.zoneName,
      zoneDescription: input.zoneDescription,
      teachingLang: input.teachingLang,
      usingLang: input.usingLang
    })

    const zone = await newZone.save()

    let createdZone

    createdZone = {
      ...zone._doc,
      _id: zone._doc._id.toString(),
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

const getZones = async (_, args, ctx, info) => {
  console.log("args: ", args)
  var more = false
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

  /* var populateQuery = "course" */
  /* for (var key in input) { */
  /*   if (input.usingLang !== "") { */
  /*     delete query.usingLang */
  /*     populateQuery = { */
  /*       path: "course", */
  /*       match: {usingLang: input[key]} */
  /*     } */
  /*   } */
  /* } */

  /* console.log("populateQuery: ", populateQuery) */

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

  if (query.cursor) {
    query._id = {$lt: query.cursor || null}
    delete query.cursor
  }

  query = {"course.usingLang": "english US"}
  console.log("query: ", query)

  try {
    /* const zones = await Zone.find(query) */
    /*   .populate("owner") */
    /*   .populate("course") */
    /*   .sort({_id: -1}) */
    /*   .limit(6) */
    /*   .lean() */

    const zones = await Zone.aggregate([
        /* $match: {}, */
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "zoneCourse"
        }
      },
      {$unwind: "$zoneCourse"}
    ])

    const lastZones = await Zone.find(query)
      .sort({_id: -1})
      .lean()

    console.log("zones: ", zones)

    /* console.log( */
    /*   "zones: ", */
    /*   zones.map(item => { */
    /*     return item._id */
    /*   }) */
    /* ) */

    if (lastZones.length !== 0) {
      var lastZone = lastZones[lastZones.length - 1]._id
    } else {
      lastZone = {}
    }

    /* let obj = zones.find(o => o._id.toString() === lastZone._id.toString()) */

    /* if (obj) { */
    if (true) {
      more = false
    } else {
      more = true
    }

    return {zones, more}
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
