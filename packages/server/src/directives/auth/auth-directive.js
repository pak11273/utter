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

      field.resolve = async function(
        source,
        {format, ...otherArgs},
        ctx,
        info
      ) {
        if (!ctx || !ctx.req.headers || !ctx.req.headers.authorization) {
          throw new Error("No authorization token")
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

          return source[fieldName]
        } catch (err) {
          throw new Error("You must be registered to view this resource.")
        }
      }
    })
  }

  visitFieldDefinition(field) {
    field.resolve = async function(source, {format, ...otherArgs}, ctx, info) {
      if (!ctx || !ctx.req.headers || !ctx.req.headers.authorization) {
        throw new Error("No authorization token")
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
        console.log("fiedl name: ", field.name)

        return source[field.name]
      } catch (err) {
        throw new Error("You must be registered to view this resource.")
      }
    }
  }
}
