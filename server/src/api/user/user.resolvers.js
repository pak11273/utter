import {User} from './userModel.js'

/*
/* signature: (rootValue, args, context, info)
 */

const getMe = (_, __, {user}) => {
  return {
    id: 2342342,
    username: 'hello',
    createdAt: 'yeas',
    updatedAt: 'sure'
  }
}

const updateMe = (_, {input}, {user}) => {
  merge(user, input)
  return user.save()
}

export const userResolvers = {
  Query: {
    getMe
  },

  User: {
    contacts: user => {
      console.log('friends')
      // TODO: Query db for contacts
      return ['Tom', 'Bob', 'Harry']
    }
  },

  Mutation: {
    updateMe
  }
}
