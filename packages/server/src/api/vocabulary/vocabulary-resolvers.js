import isEmpty from "lodash/isEmpty"
var cloudinary = require("cloudinary").v2
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
const folder = "vocabulary-audio"

const vocabularyAudioSave = async (_, args, ctx, info) => {
  const arrayOfErrors = []

  try {
    const vocabulary = await Vocabulary.findByIdAndUpdate(args._id, args, {
      new: true
    }).lean()

    return {
      vocabulary,
      errors: arrayOfErrors
    }
  } catch (err) {
    return {
      vocabulary: null,
      errors: arrayOfErrors
    }
  }
}

const vocabularyAudioDelete = async (_, args, ctx, info) => {
  const arrayOfErrors = []

  try {
    // delete from cdn
    const all = await new Promise(async resolve => {
      const result = await cloudinary.uploader.destroy(
        folder + "/" + args.public_id,
        {
          invalidate: true,
          resource_type: "video"
        },
        async (err, result) => {
          if (err) {
            throw err
          }
          const vocabulary = await Vocabulary.findByIdAndUpdate(
            args._id,
            {audioUrl: null},
            {
              new: true
            }
          ).exec()

          resolve({
            vocabulary,
            errors: arrayOfErrors
          })
        }
      )
    })

    return all
  } catch (err) {
    console.log("err: ", err)
    arrayOfErrors.push({
      path: "audio",
      message: err
    })
    return {
      vocabulary: null,
      errors: arrayOfErrors
    }
  }
}

const vocabularyCreate = async (_, {input}, ctx, info) => {
  const arrayOfErrors = []

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
      keyword: input.keyword,
      partsOfSpeech: input.partsOfSpeech,
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

const getVocabulary = async (_, {level}, {user}) => {
  const vocabulary = await Vocabulary.findById(level).exec()
  if (!vocabulary) {
    throw new Error("Cannot find vocabulary with id")
  }

  return vocabulary
}

const vocabularyDelete = async (_, args, ctx) => {
  console.log("deleted args; ", args)
  const arrayOfErrors = []
  if (token === "null") {
    return new Error("You need to be registered to view this resource.")
  }
  const token = ctx.req.headers.authorization
  console.log("token; ", token)
  const user = await userByToken(token, (err, res) => {
    if (err) return err
    return res
  })

  const word = await Vocabulary.findOneAndDelete({_id: args._id}).lean()
  console.log("word; ", word)

  const level = await Level.findById(word.level)
  level.vocabulary.pull(word._id)
  level.save()
  console.log("level: ", level)

  // delete from cdn
  await cloudinary.uploader.destroy(
    folder + "/" + args.public_id,
    {
      invalidate: true,
      resource_type: "video"
    },
    async (err, result) => {
      if (err) {
        throw err
      }
    }
  )

  console.log("final result: ", word)
  if (!word) {
    arrayOfErrors.push({
      path: "word",
      message: "An Error has occured.  Please contact technical support."
    })
  }

  return {
    word,
    errors: arrayOfErrors
  }
}

const vocabularyUpdate = async (_, {input}) => {
  console.log("input: ", input)
  try {
    var arrayOfErrors = []
    const {_id, ...update} = input
    const updatedWord = await Vocabulary.findByIdAndUpdate(_id, update, {
      new: true
    }).exec()

    return {
      vocabulary: updatedWord,
      errors: arrayOfErrors
    }
  } catch (err) {
    return {
      vocabulary: null,
      errors: [
        {
          message: err
        }
      ]
    }
  }
}

const getVocabularies = async (_, args, ctx, info) => {
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
    vocabularyAudioSave,
    vocabularyAudioDelete,
    vocabularyCreate,
    vocabularyDelete,
    vocabularyUpdate
  }
  /* Vocabulary: { */
  /*   async course(vocabulary) { */
  /*     const populated = await vocabulary.populate("course").execPopulate() */

  /*     return populated.course */
  /*   } */
  /* } */
}
