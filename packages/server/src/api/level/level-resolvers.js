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

const allLevels = async (_, {levelId}, {user}) => {
  console.log("hello")
  const level = await Level.findById(levelId).exec()
  if (!level) {
    throw new Error("Cannot find level with id")
  }

  return level
}

const getLevel = async (_, {levelId}, {user}) => {
  console.log("bye")
  const level = await Level.findById(levelId).exec()
  if (!level) {
    throw new Error("Cannot find level with id")
  }

  return level
}

const levelDelete = async (_, args, ctx) => {
  console.log("nah")
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
  console.log("update")
  const {_id, ...update} = input
  return Level.findByIdAndUpdate(_id, update, {new: true}).exec()
}

const levelCreate = async (_, args, ctx, info) => {
  console.log("args: ", args)
  try {
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

    const newLevel = new Level({
      level: input.level,
      title: input.title,
      courseId: input.courseId
    })

    let levelCourse

    const level = await newLevel.save()

    console.log("levle; ", level)

    levelCourse = {
      ...level._doc,
      _id: level._doc._id.toString()
    }

    const course = await Course.findById(input.courseId)
    console.log("cours: ", course)

    if (!course) {
      throw new Error("Course not found.")
    }

    course.levels.push(level)

    await course.save()

    return levelCourse
  } catch (err) {
    throw err
  }

  /* const level = await Course.findOneAndUpdate( */
  /* { */
  /* _id: input.courseId, */
  /* "levels.level": { */
  /* $ne: input.level */
  /* } */
  /* }, */
  /* { */
  /* $push: { */
  /* levels: { */
  /* courseId: input.courseId, */
  /* level: input.level, */
  /* title: input.title */
  /* } */
  /* } */
  /* }, */
  /* {new: true} */
  /* ) */

  /* if (!level) { */
  /* arrayOfErrors.push({ */
  /* path: "level", */
  /* message: "Courses cannot have duplicate level numbers." */
  /* }) */
  /* } */

  /* return { */
  /* level: level.levels[level.levels.length - 1], */
  /* errors: arrayOfErrors */
  /* } */
}

const getLevels = async (_, args, ctx, info) => {
  console.log("get level args: ", args)
  console.log("get levels")
  try {
    /* let result = await Level.find({"course._id": args.courseId}) */
    let result = await Level.find()

    console.log("result: ", result)

    if (result) {
      var sortedLevels = result.sort((a, b) => {
        return a.level - b.level
      })
    }

    if (isEmpty(result)) {
      return {levels: []}
    } else {
      return {levels: sortedLevels}
    }
  } catch (err) {
    return err
  }
}

export const levelResolvers = {
  Query: {
    allLevels,
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
