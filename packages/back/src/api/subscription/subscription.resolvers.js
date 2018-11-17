import Subscription from './subscriptionModel.js'
import Course from '../course/courseModel.js'

const getSubscription = async (_, {input}) => {
  const subscription = await Subscription.findById(id).exec()
  if (!subscription) {
    throw new Error('Cannot find subscription with id')
  }

  return subscription
}

const allSubscriptions = () => {
  return Subscription.find({}).exec()
}

const newSubscription = (_, {input}) => {
  return Subscription.create(input)
}

const updateSubscription = (_, {input}) => {
  const {id, ...update} = input

  return Subscription.findByIdandUpdate(id, update, {new: true}).exec()
}

export const subscriptionResolvers = {
  Query: {
    allSubscriptions,
    Subscription: getSubscription
  },

  Mutation: {
    newSubscription,
    updateSubscription
  },

  Subscription: {
    async courses(subscription) {
      const populated = await subscription.populate('courses').execPopulate()

      return populated.courses
    }
  }
}
