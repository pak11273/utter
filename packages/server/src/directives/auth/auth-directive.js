import {SchemaDirectiveVisitor} from "graphql-tools"
import * as jwt from "jsonwebtoken"
import {
  GraphQLDirective,
  DirectiveLocation,
  defaultFieldResolver
} from "graphql"
import {authorizationError} from "../../errors/graphql-errors"
import config from "../../config"

export class isAuthenticatedDirective extends SchemaDirectiveVisitor {
  /* static getDirectiveDeclaration(directiveName, schema) { */
  /*   return new GraphQLDirective({ */
  /*     name: "auth", */
  /*     locations: [DirectiveLocation.FIELD_DEFINITION, DirectiveLocation.OBJECT] */
  /*   }) */
  /* } */
  visitObject(type) {
    this.ensureFieldsWrapped(type)
    type._requiredAuthRole = this.args.requires
  }

  visitFieldDefinition(field) {
    const {resolve = defaultFieldResolver} = field
    field.resolve = async function(source, {format, ...otherArgs}, ctx, info) {
      if (!ctx || !ctx.req.headers || !ctx.req.headers.authorization) {
        throw new Error("No authorization token")
      }

      const token = ctx.req.headers.authorization

      jwt.verify(token, config.env.JWT, (err, decoded) => {
        if (err) {
          console.log("err: ", err)
          throw new Error("You are not authorized for this resource.")
        } else {
          ctx.user = decoded._id
        }
      })
      return resolve(source, otherArgs, ctx)

      /* try { */
      /*   const decoded = jwt.verify( */
      /*     token, */
      /*     config.secrets.JWT, */
      /*     async (err, decoded) => { */
      /*       if (err) { */
      /*         console.log("err: ", err) */
      /*         return err */
      /*       } else { */
      /*         console.log("decoded: ", decoded) */
      /*         ctx.user = await decoded._id */
      /*       } */
      /*     } */
      /*   ) */
      /*   return resolve(source, field.args, ctx) */
      /* } catch (err) { */
      /*   throw new Error("You are not authorized for this resource.") */
      /* } */
    }
  }
}
