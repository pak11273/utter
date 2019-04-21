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

const vocabularyAudioSave = async (_, args, ctx, info) => {
  console.log("args: ", args)
  const arrayOfErrors = []

  try {
    const vocabulary = await Vocabulary.findByIdAndUpdate(args._id, args).exec()

    console.log("vocabulary: ", vocabulary)

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

const vocabularyCreate = async (_, args, ctx, info) => {
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

const getVocabulary = async (_, {level}, {user}) => {
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

  const word = await Vocabulary.findOneAndDelete({_id: args._id}).lean()

  const level = await Level.findById(word.level)
  level.vocabulary.pull(word._id)
  level.save()

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
