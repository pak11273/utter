import isEmpty from "lodash/isEmpty"
import config from "../../config"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Course from "../course/course-model"
import Level from "../level/level-model.js"
import Vocabulary from "./vocabulary-model"
import {userByToken} from "../shared/resolver-functions.js"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const getVocabulary = async (_, {levelId}, {user}) => {
  console.log("levelId: ", levelId)
  const vocabulary = await Vocabulary.findById(levelId).exec()
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
      _id: args.courseId
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
  const vocabulary = await Course.findOneAndUpdate(
    {
      _id: input.courseId,
      "levels.level": {
        $eq: input.level
      }
    },
    {
      $push: {
        "levels.$.vocabulary": {
          audioUrl: input.audioUrl,
          courseId: input.courseId,
          gender: input.gender,
          translation: input.translation,
          word: input.word
        }
      }
    },
    {new: true}
  )

  if (!vocabulary) {
    arrayOfErrors.push({
      path: "vocabulary",
      message:
        "Server Error: Could not save new vocabulary. Please contact technical support."
    })
  }

  const vocabularyArr = vocabulary.levels[0].vocabulary
  const vocabularyObj = vocabularyArr[vocabularyArr.length - 1]
  vocabularyObj.toObject()
  vocabularyObj.id = vocabularyObj._id
  console.log("vocabularyObj; ", vocabularyObj)
  return {
    vocabulary: vocabularyObj,
    errors: arrayOfErrors
  }
}

const getVocabularies = async (_, args, ctx, info) => {
  console.log("args: ", args)
  let result = await Course.find({_id: args.courseId}).exec()

  console.log("result: ", result)

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
    getVocabulary,
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
