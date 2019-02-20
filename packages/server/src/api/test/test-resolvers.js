import Test from "./test-model.js"

const getTest = async (_, args, ctx, info) => {
  let result = await Test.findOne({username: args.input})
  return result
}

const addTest = async (_, args, ctx, info) => {
	let newTest = new Test({testName: args.name})
  let result = await newTest.save()
  return result
}

const deleteTest = async (_, args, ctx, info) => {
	const result = await Test.findByIdAndRemove(args.id)
	return result
}

const updateTest = async (_, args, ctx, info) => {
	let found = await Test.findByIdAndUpdate(args.id, {$set: {testName: args.name}}, {new: true})
	return found
}

const getTests = async (_, args, ctx, info) => {
  let result = await Test.find()
  return result
}

export const testResolvers = {
  Query: {
    beef: () => `Hello Beef`,
    getTest,
    getTests
  },
	Mutation: {
		addTest,
		updateTest
	}
}
