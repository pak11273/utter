import isEmpty from "lodash/isEmpty"
import config from "../../config"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Course from "../course/course-model"
import Level from "../level/level-model.js"
import User from "../user/user-model.js"
import Vocabulary from "./vocabulary-model"
import {userByToken} from "../shared/resolver-functions.js"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const getVocabulary = async (_, {level}, {user}) => {
  console.log("level: ", level)
  const vocabulary = await Vocabulary.findById(level).exec()
  if (!vocabulary) {
    throw new Error("Cannot find vocabulary with id")
  }

  return vocabulary
}

const vocabularyDelete = async (_, args, ctx) => {
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

  const vocabulary = await Course.findOneAndUpdate(
    {
      _id: args.level
    },
    {
      $pull: {
        vocabulary: {
          vocabulary: args.vocabulary
        }
      }
    },
    {new: true}
  )

  console.log("LEVELVELVELVLELVELVELEL: ", vocabulary)

  if (!vocabulary) {
    arrayOfErrors.push({
      path: "vocabulary",
      message: "An Error has occured.  Please contact technical support."
    })
  }

  console.log("array of errors: ", arrayOfErrors)

  return {
    vocabulary: args,
    errors: arrayOfErrors
  }
}

const vocabularyUpdate = (_, {input}) => {
  const {id, ...update} = input
  return Vocabulary.findByIdAndUpdate(id, update, {new: true}).exec()
}

const vocabularyCreate = async (_, args, ctx, info) => {
  console.log("args: ", args)
  const arrayOfErrors = []

  const {input} = args
  try {
    if (!ctx.isAuth) {
      throw new Error("You need to be registered to create a course.")
    }

    const userId = ctx.req.token._id

    const user = await User.findById(userId, (err, res) => {
      if (err) return err
      return res
    })

    const newVocabulary = new Vocabulary({
      audioUrl: input.audioUrl,
      level: input.level,
      gender: input.gender,
      translation: input.translation,
      word: input.word
    })

    const vocabulary = await newVocabulary.save()

    const level = await Level.findById(input.level)
    level.vocabulary.push(vocabulary)
    level.save()

    if (!level) {
      throw new Error("Level not found.")
    }

    return {
      vocabulary,
      errors: arrayOfErrors
    }
  } catch (err) {
    throw err
  }
}

const getVocabularies = async (_, args, ctx, info) => {
  console.log("args: ", args)
  const arrayOfErrors = []
  let result = await Level.findById(args.level)
    .populate("vocabulary")
    .lean()

  return {
    vocabulary: result.vocabulary,
    errors: arrayOfErrors
  }

  /* if (!result || isEmpty(result)) { */
  /*   return {vocabulary: []} */
  /* } */

  /* const sortedVocabulary = result[0].vocabulary.sort((a, b) => { */
  /*   return a.vocabulary - b.vocabulary */
  /* }) */

  /* if (isEmpty(result)) { */
  /*   return {vocabulary: []} */
  /* } else { */
  /*   return {vocabulary: sortedVocabulary} */
  /* } */
}

export const vocabularyResolvers = {
  Query: {
    getVocabularies
  },
  Mutation: {
    vocabularyDelete,
    vocabularyUpdate,
    vocabularyCreate
  }
  /* Vocabulary: { */
  /*   async course(vocabulary) { */
  /*     const populated = await vocabulary.populate("course").execPopulate() */

  /*     return populated.course */
  /*   } */
  /* } */
}
