import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"
import Level from "./level-model"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

/* const getLevel = async (_, {id}, {user}) => { */
/*   const level = await Level.findById(id).exec() */
/*   if (!level) { */
/*     throw new Error("Cannot find level with id") */
/*   } */

/*   return level */
/* } */

const deleteLevel = async (_, {id}, ctx) => {
  console.log("id: ", id)
  const level = await Level.findById(id).exec()
  /* Level.findOneAndDelete({levelAuthor: user._id && id: id}) { */
  /* } */

  if (!level) {
    throw new Error("No level found.")
  }

  if (level.levelAuthor === id) {
    // TODO: delete level
  }

  return level
}

const updateLevel = (_, {input}) => {
  const {id, ...update} = input
  return Level.findByIdAndUpdate(id, update, {new: true}).exec()
}

const levelCreate = async (_, args, ctx, info) => {
  console.log("args: ", args)
  console.log("ctx: ", ctx.user)
  //TODO can't have duplicate level names
  const {input} = args
  input.levelAuthor = ctx.user
  const level = await Level.create(input)
  level.id = level._id
  console.log("level: ", typeof level)
  return level
}

const getCreatedLevels = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.levelAuthor = ctx.user
  // end query object

  /* // TODO: HOTFIX, using a fake levelAuthor, delete this after testing */
  /* query.levelAuthor = "5b9012f043aa4329f187f01a" */
  /* end */

  if (args.cursor) {
    // type cast id, $lt is not the same in aggregate vs query
    var cursorObj = mongoose.Types.ObjectId(args.cursor)
    // add to query object
    var cursor = cursorObj
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
    getCreatedLevels
    /* getLevel */
  },
  Mutation: {
    deleteLevel,
    updateLevel,
    levelCreate
  },
  Level: {
    async levelAuthor(level) {
      const populated = await level.populate("levelAuthor").execPopulate()

      return populated.levelAuthor
    }
  }
}
