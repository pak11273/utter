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
    hello: (_, {name}) => `Hello ${name || 'World'}`
  },

  User: {
    contacts: user => {
      console.log('friends')
      // TODO: Query db for contacts
      return ['Tom', 'Bob', 'Harry']
    }
  },

  Mutation: {
    createUser(_, args, ctx, info) {
      const username = args.input.username
      return {
        username
      }
    },
    updateMe
  }
}
