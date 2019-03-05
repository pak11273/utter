import isEmpty from "lodash/isEmpty"
import config from "../../config"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Course from "../course/course-model"
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

const levelDelete = async (_, args, ctx) => {
  const arrayOfErrors = []
  if (token === "null") {
    return new Error("You need to be registered to view this resource.")
  }
  const token = ctx.req.headers.authorization
  const user = await userByToken(token, (err, res) => {
    if (err) return err
    return res
  })

  console.log("args: ", args)

  const level = await Course.findOneAndUpdate(
    {
      _id: args.courseId
    },
    {
      $pull: {
        levels: {
          level: args.level
        }
      }
    },
    {new: true}
  )

  console.log("LEVELVELVELVLELVELVELEL: ", level)

  if (!level) {
    arrayOfErrors.push({
      path: "level",
      message: "An Error has occured.  Please contact technical support."
    })
  }

  console.log("array of errors: ", arrayOfErrors)

  return {
    level: args,
    errors: arrayOfErrors
  }
}

const levelUpdate = (_, {input}) => {
  const {_id, ...update} = input
  return Level.findByIdAndUpdate(_id, update, {new: true}).exec()
}

const levelCreate = async (_, args, ctx, info) => {
  let arrayOfErrors = []
  const token = ctx.req.headers.authorization
  if (token === "null") {
    return new Error("You need to be registered to view this resource.")
  }
  const user = await userByToken(token, (err, res) => {
    if (err) return err
    return res
  })

  const {input} = args

  const level = await Course.findOneAndUpdate(
    {
      _id: input.courseId,
      "levels.level": {
        $ne: input.level
      }
    },
    {
      $push: {
        levels: {
          courseId: input.courseId,
          level: input.level,
          title: input.title
        }
      }
    },
    {new: true}
  )

  if (!level) {
    arrayOfErrors.push({
      path: "level",
      message: "Courses cannot have duplicate level numbers."
    })
  }

  return {
    level: level.levels[level.levels.length - 1],
    errors: arrayOfErrors
  }
}

const getLevels = async (_, args, ctx, info) => {
  let result = await Course.find({_id: args.courseId}).exec()

  const sortedLevels = result[0].levels.sort((a, b) => {
    return a.level - b.level
  })

  if (isEmpty(result)) {
    return {levels: []}
  } else {
    return {levels: sortedLevels}
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
