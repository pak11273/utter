import isEmpty from "lodash/isEmpty"
import config from "../../config"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Level from "./level-model"
import {userByToken} from "../shared/resolver-functions.js"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const getLevel = async (_, {levelId}, {user}) => {
  const level = await Level.findById(levelId).exec()
  if (!level) {
    throw new Error("Cannot find level with id")
  }

  return level
}

const levelDelete = async (_, {id}, ctx) => {
  if (token === "null") {
    return new Error("You need to be registered to view this resource.")
  }
  const token = ctx.req.headers.authorization
  const user = await userByToken(token, (err, res) => {
    if (err) return err
    return res
  })

  const level = await Level.findOneAndDelete({owner: user._id})
  if (!level) {
    throw new Error("No level found by this owner.")
  }

  if (level) {
    return true
  }
}

const levelUpdate = (_, {input}) => {
  const {id, ...update} = input
  return Level.findByIdAndUpdate(id, update, {new: true}).exec()
}

const levelCreate = async (_, args, ctx, info) => {
  console.log("args: ", args)
  const token = ctx.req.headers.authorization
  if (token === "null") {
    return new Error("You need to be registered to view this resource.")
  }
  const user = await userByToken(token, (err, res) => {
    if (err) return err
    return res
  })

  //TODO can't have duplicate level names
  const {input} = args
  input.owner = user._id
  const level = await Level.create(input)
  level.id = level._id
  return level
}

const getLevels = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  var levelName, resources, owner
  args.levelName
    ? (query.levelName = new RegExp(escapeRegex(args.levelName), "gi"))
    : null

  if (!isEmpty(args.resources)) {
    var newArray = []
    args.resources.map(item => {
      const escapedStr = new RegExp(escapeRegex(item), "gi")
      newArray.push(escapedStr)
    })
    query.resources = newArray
  } else {
    null
  }
  if (args.owner) {
    var owner = await Level.findByUsername(args.owner, (err, docs) => {
      if (err) {
        // console.log doesn't work here
      }
      if (!isEmpty(docs)) {
        var owner = docs._id
        query.owner = owner
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

  if (args.cursor && args.cursor !== "done") {
    // type cast id, $lt is not the same in aggregate vs query
    var cursor = mongoose.Types.ObjectId(args.cursor)
    // add to query object
    query._id = {$lt: cursor}
  }

  let result = await Level.find(query)
    .limit(3)
    .sort({_id: -1})
    .exec()

  if (isEmpty(result)) {
    return {levels: [], cursor: "done"}
  } else {
    cursor = result[result.length - 1]._id
    return {levels: result, cursor}
  }
}

export const levelResolvers = {
  Query: {
    getLevels,
    getLevel
  },
  Mutation: {
    levelDelete,
    levelUpdate,
    levelCreate
  },
  Level: {
    async owner(level) {
      const populated = await level.populate("owner").execPopulate()

      return populated.owner
    }
  }
}
