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
  console.log("level: ", levelId)
  try {
    const level = await Level.findById(levelId)
      .populate("vocabulary")
      .lean()

    if (!level) {
      throw new Error("Cannot find level with id")
    }

    return level
  } catch (err) {
    console.log("err: ", err)
    return err
  }
}

const getLevels = async (_, args, ctx, info) => {
  const arrayOfErrors = []
  console.log("args; ", args)
  try {
    const course = await Course.findById(args.courseId)
      .populate("levels")
      .limit(100)
      .lean()

    console.log("coursse; ", course)
    if (!course) {
      throw new Error(
        "This course has been removed by the author.  It will be removed from your subscriptions.  Please select a different course."
      )
    }

    const ids = course.levelSort

    const sortedLevels = course.levels.sort(function(a, b) {
      // Sort docs by the order of their _id values in ids.
      return ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    })

    if (isEmpty(course.levels)) {
      return {levels: []}
    } else {
      return {levels: sortedLevels}
    }
  } catch (err) {
    console.log("msg: ", err)
    return err
    /* arrayOfErrors.push({ */
    /*   path: "levels", */
    /*   message: err.message */
    /* }) */
    /* // TODO */
    /* return { */
    /*   levels: null, */
    /*   errors: arrayOfErrors */
    /* } */
  }
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

  const level = await Level.findOneAndDelete({_id: args._id}).lean()

  const course = await Course.findById(level.course)
  course.levels.pull(level._id)
  course.save()

  if (!level) {
    arrayOfErrors.push({
      path: "level",
      message: "An Error has occured.  Please contact technical support."
    })
  }

  return {
    level,
    errors: arrayOfErrors
  }
}

const levelSort = async (_, {input}, {redis, url}) => {
  const course = await Course.findByIdAndUpdate(input.courseId, {
    levelSort: input.levelSort
  }).exec()

  const {_id, ...update} = input
  return {
    level: Level,
    errors: []
  }
}

const levelUpdate = async (_, {input}) => {
  try {
    var arrayOfErrors = []
    const {_id, ...update} = input
    const updatedLevel = await Level.findByIdAndUpdate(_id, update, {
      new: true
    }).lean()

    return {
      level: updatedLevel,
      errors: arrayOfErrors
    }
  } catch (err) {
    if (err) {
      arrayOfErrors.push({
        path: "title",
        message: err
      })
    }
    return {
      level: [],
      errors: arrayOfErrors
    }
  }
}

const levelCreate = async (_, {input}, ctx, info) => {
  let arrayOfErrors = []
  const token = ctx.req.headers.authorization
  if (token === "null") {
    return new Error("You need to be registered to view this resource.")
  }
  const user = await userByToken(token, (err, res) => {
    if (err) return err
    return res
  })

  const newLevel = new Level({...input, course: input.courseId})

  const level = await newLevel.save()

  const course = await Course.findById(input.courseId)

  course.levels.push(level)

  await course.save()

  if (!course) {
    arrayOfErrors.push({
      path: "level",
      message: "Course was not found."
    })
  } else {
    return {
      level,
      errors: arrayOfErrors
    }
  }
}

export const levelResolvers = {
  Query: {
    getLevels,
    getLevel
  },
  Mutation: {
    levelDelete,
    levelCreate,
    levelSort,
    levelUpdate
  }
  /* Level: { */
  /*   async course(level) { */
  /*     const populated = await level.populate("course").execPopulate() */

  /*     return populated.course */
  /*   } */
  /* } */
}
