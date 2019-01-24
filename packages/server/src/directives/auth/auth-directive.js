import {SchemaDirectiveVisitor} from "apollo-server"
import * as jwt from "jsonwebtoken"
import {
  GraphQLDirective,
  GraphQLList,
  DirectiveLocation,
  defaultFieldResolver
} from "graphql"
import config from "../../config"

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(obj) {
    const fields = obj.getFields()

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]

      field.resolve = async function(source, args, ctx, info) {
        if (
          !ctx ||
          !ctx.req.headers ||
          !ctx.req.headers.authorization ||
          ctx.req.headers.authorization === "null"
        ) {
          throw new Error("You must be registered to view this resource.")
        }

        const token = ctx.req.headers.authorization

        try {
          jwt.verify(token, config.env.JWT, (err, decoded) => {
            if (err) {
              throw new Error(
                "Something is wrong with your credentials.  Please contact technical support."
              )
            } else {
              ctx.user = decoded._id
            }
          })
          console.log("SOURCE: ", source[fieldName])
          return source[fieldName]
        } catch (err) {
          return err
        }
      }
    })
  }

  visitFieldDefinition(field, details) {
    const fields = details.objectType.getFields()
    const {resolve = defaultFieldResolver} = field

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]

      field.resolve = async function(...args) {
        const ctx = args[2]
        if (
          !ctx ||
          !ctx.req.headers ||
          !ctx.req.headers.authorization ||
          ctx.req.headers.authorization === "null"
        ) {
          throw new Error("You must be registered to view this resource.")
        }

        const token = ctx.req.headers.authorization

        try {
          jwt.verify(token, config.env.JWT, (err, decoded) => {
            if (err) {
              throw new Error(
                "Something is wrong with your credentials.  Please contact technical support."
              )
            } else {
              ctx.user = decoded._id
            }
          })
          return resolve.apply(this, args)
        } catch (err) {
          return err
        }
      }
    })
  }
}
