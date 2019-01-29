import Test from "./test-model.js"

const getTest = async (_, args, ctx, info) => {
  let result = await Test.findOne({username: args.input})
  return result
}

export const testResolvers = {
  Query: {
    beef: () => `Hello Beef`,
    getTest
  }
}
