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
  console.log("args: ", args)
  try {
    if (!req.session || !req.session.userId) {
      throw new Error("Not authenticated.")
    }

    // TODO: uncomment for production
    /* const findZone = await Zone.find({owner: req.session.userId}) */
    /* if (findZone[0] instanceof mongoose.Document) { */
    /*   throw new Error("You can only host one zone at a time.") */
    /* } */

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
      password: input.password,
      reserved: input.reserved,
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

const getZones = async (_, {input}, ctx, info) => {
  console.log("input: ", input)
  const options = {
    lean: true,
    page: input.page,
    limit: 6,
    populate: "owner",
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

  return Zone.paginate(query, options, function(err, result) {
    console.log("result: ", result)
    console.log("result: ", result.totalDocs)
    return {
      page: result.page,
      zones: result.docs,
      more: result.hasNextPage
    }
  })
}

const rezone = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.owner = ctx.user
  //TODO
}

export const zoneResolvers = {
  Query: {
    getZones,
    getZone,
    getZoneLevels
  },
  Mutation: {
    rezone,
    zoneDelete,
    zoneUpdate,
    zoneCreate
  }
}
