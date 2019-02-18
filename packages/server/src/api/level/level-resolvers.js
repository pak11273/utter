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
  const level = await Level.create(input)
  level.id = level._id
  return level
}

const getLevels = async (_, args, ctx, info) => {
  console.log("args", args)

  let result = await Level.find({courseId: args.courseId})
    .sort({_id: -1})
    .exec()

  if (isEmpty(result)) {
    return {levels: []}
  } else {
    console.log("result: ", result)
    return {levels: result}
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
  }
  /* Level: { */
  /*   async course(level) { */
  /*     const populated = await level.populate("course").execPopulate() */

  /*     return populated.course */
  /*   } */
  /* } */
}
