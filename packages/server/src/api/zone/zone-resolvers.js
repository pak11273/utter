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

const zoneCreate = async (_, args, {req}, info) => {
  try {
    if (!req.session || !req.session.userId) {
      throw new Error("Not authenticated.")
    }

    const findZone = await Zone.findOne({ownerId: req.session.userId}).lean()
    console.log("found one: ", findZone)
    if (!findZone) {
      throw new Error("You can only host one zone at a time.")
    }

    const user = await User.findById(req.session.userId, (err, res) => {
      if (err) return err
      return res
    })

    const {input} = args

    const newZone = new Zone({
      app: input.app,
      course: input.course,
      courseLevel: +input.courseLevel,
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
  var more = false
  var {input} = args
  console.log("input: ", input)

  var hostMatch = new RegExp(".", "i")
  /* var levelMatch = new RegExp(".", "i") */
  var zoneMatch = new RegExp(".", "i")
  var usingLangMatch = new RegExp(".", "i")
  var teachingLangMatch = new RegExp(".", "i")
  var appMatch = new RegExp(".", "i")
  var titleMatch = new RegExp(".", "i")

  if (input.searchInput || input.selectionBox) {
    input[input.selectionBox] = input.searchInput
    delete input.selectionBox
  }

  var cursor = {null: null}
  if (input.cursor) {
    cursor = {$lt: input.cursor}
    delete input.cursor
  }
  console.log("curser: ", cursor)
  for (var key in input) {
    if (input[key] !== "") {
      if (key === "host" && input.searchInput !== "") {
        hostMatch = input[key]
      }
      /* if (key === "level" && input.searchInput !== "") { */
      /*   levelMatch = +input[key] */
      /* } */
      if (key === "zoneName" && input.searchInput !== "") {
        zoneMatch = new RegExp(input[key], "i")
      }
      if (key === "usingLang") {
        usingLangMatch = input[key]
      }
      if (key === "teachingLang") {
        teachingLangMatch = input[key]
      }
      if (key === "app") {
        appMatch = input[key]
      }
      if (key === "subscriptions") {
        titleMatch = input[key]
      }
    }
    delete input.searchInput
  }

  try {
    const zones = await Zone.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerCourse"
        }
      },
      {$unwind: "$ownerCourse"},
      {
        $lookup: {
          from: "courses",
          localField: "course",
          foreignField: "_id",
          as: "zoneCourse"
        }
      },
      {$unwind: "$zoneCourse"},
      {
        $match: {
          $and: [
            cursor,
            {app: appMatch},
            /* {courseLevel: levelMatch}, */
            {zoneName: zoneMatch},
            {"ownerCourse.username": hostMatch},
            {"zoneCourse.usingLang": usingLangMatch},
            {"zoneCourse.teachingLang": teachingLangMatch},
            {"zoneCourse.title": titleMatch}
          ]
        }
      }
    ])
      .sort({_id: -1})
      .limit(4)

    const lastZones = await Zone.find(cursor)
      .sort({_id: -1})
      .lean()

    console.log("zones: ", zones)

    console.log("lastZones: ", lastZones)

    console.log(
      "zones: ",
      zones.map(item => {
        return item._id
      })
    )

    if (lastZones.length !== 0) {
      var lastZone = lastZones[lastZones.length - 1]._id
    } else {
      lastZone = {}
    }

    console.log("last zone: ", lastZone)

    let obj = zones.find(o => o._id.toString() === lastZone._id.toString())

    if (obj) {
      more = false
    } else {
      more = true
    }
    console.log("more: ", more)

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
