import {isEmpty} from "lodash"
import mongoose from "mongoose"
import App from "./app-model"
import fetch from "node-fetch"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const getApp = async (_, {appId}, {user}) => {
  console.log("appId: ", appId)
  const app = await App.findById(appId).exec()
  if (!app) {
    throw new Error("Cannot find app with id")
  }

  return app
}

const getPixabayData = async (_, args, {user}) => {
  const url = `https://pixabay.com/api/?key=${
    process.env.PIXABAY_API_KEY
  }&q=undefinedquery`
  const response = await fetch(url)
  const headers = response.headers.raw()
  const fetched = await response.json()

  return {
    rateLimit: headers["x-ratelimit-limit"][0],
    remaining: headers["x-ratelimit-remaining"][0],
    reset: headers["x-ratelimit-reset"][0]
  }
}

const appDelete = async (_, {id}, ctx) => {
  console.log("id: ", id)
  const app = await App.findById(id).exec()
  /* App.findOneAndDelete({appAuthor: user._id && id: id}) { */
  /* } */

  if (!app) {
    throw new Error("No app found.")
  }

  if (app.appAuthor === id) {
    // TODO: delete app
  }

  return app
}

const appUpdate = (_, {input}) => {
  const {id, ...update} = input
  return App.findByIdAndUpdate(id, update, {new: true}).exec()
}

const appCreate = async (_, args, ctx, info) => {
  console.log("args: ", args)
  console.log("ctx: ", ctx.user)
  //TODO can't have duplicate app names
  const {input} = args
  input.appAuthor = ctx.user
  const app = await App.create(input)
  app.id = app._id
  console.log("app: ", typeof app)
  return app
}

const getAppLevels = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.appAuthor = ctx.user
}

const getCreatedApps = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  query.appAuthor = ctx.user
  // end query object

  /* // TODO: HOTFIX, using a fake appAuthor, delete this after testing */
  /* query.appAuthor = "5b9012f043aa4329f187f01a" */
  /* end */

  if (args.cursor) {
    // type cast id, $lt is not the same in aggregate vs query
    var cursorObj = mongoose.Types.ObjectId(args.cursor)
    // add to query object
    var cursor = cursorObj
    query._id = {$lt: cursor}
  }

  let result = await App.find(query)
    .limit(3)
    .sort({_id: -1})
    .exec()

  if (isEmpty(result)) {
    return {apps: [], cursor: "done"}
  } else {
    cursor = result[result.length - 1]._id
    return {apps: result, cursor}
  }
}

const getApps = async (_, args, ctx, info) => {
  // build query object
  const query = {}
  var appName, appRef, appAuthor

  args.title
    ? (query.appName = new RegExp(escapeRegex(args.title), "gi"))
    : null

  args.ref ? (query.appRef = new RegExp(escapeRegex(args.ref), "gi")) : null

  if (args.author) {
    var appAuthor = await App.findByUsername(args.author, (err, docs) => {
      if (err) {
        // console.log doesn't work here
      }
      if (!isEmpty(docs)) {
        var appAuthor = docs._id
        query.appAuthor = appAuthor
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

  if (args.cursor) {
    // type cast id, $lt is not the same in aggregate vs query
    var cursor = mongoose.Types.ObjectId(args.cursor)
    // add to query object
    query._id = {$lt: cursor}
  }

  let result = await App.find(query)
    .limit(3)
    .sort({_id: -1})
    .exec()

  if (isEmpty(result)) {
    console.log("done")
    return {apps: [], cursor: "done"}
  } else {
    cursor = result[result.length - 1]._id
    return {apps: result, cursor}
  }
}

export const appResolvers = {
  Query: {
    getPixabayData,
    getCreatedApps,
    getApps,
    getApp,
    getAppLevels
  },
  Mutation: {
    appDelete,
    appUpdate,
    appCreate
  },
  App: {
    async appAuthor(app) {
      const populated = await app.populate("appAuthor").execPopulate()

      return populated.appAuthor
    }
  }
}
