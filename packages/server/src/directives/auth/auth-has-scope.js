/* import { AuthorizationError } from "./errors"; */
import * as jwt from "jsonwebtoken"
import {flatten, uniq} from "lodash"
import {SchemaDirectiveVisitor} from "apollo-server"
import {userByToken} from "../../api/shared/resolver-functions.js"
import {
  DirectiveLocation,
  defaultFieldResolver,
  GraphQLDirective,
  GraphQLList
} from "graphql"
import User from "../../api/user/user-model.js"

import rules from "@utterzone/common/dist/auth/roles-schema"

export class hasScopeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {scopes} = this.args
    const expectedScopes = scopes
    console.log("scopes; ", expectedScopes)
    field.resolve = async function(result, args, ctx, info) {
      const token = ctx.req.headers.authorization
      if (token === "null") {
        return new Error("You need to be registered to view this resource.")
      }

      try {
        const {resolve = defaultFieldResolver} = field
        const token = ctx.req.headers.authorization
        const user = await userByToken(token, (err, res) => {
          if (err) {
            console.log("user error: ", err)
            return err
          }
          return res
        })

        if (user === Error) return user

        // get all the roles of the user
        // TODO turn all roles for user into flattened array of permissions

        const reducePermissions = (rules, roles, scope, data = {}) => {
          if (!roles) roles = ["guest"]
          // Users without roles
          roles.map(role => {
            const permissions = rules[role]
            if (!permissions) {
              // role is not present in the rules
              return false
            }
          })

          // Static rules setup
          var combinedStaticRules = []

          roles.map(role => {
            combinedStaticRules.push(rules[role].static)
          })

          var staticPermissions = uniq(flatten(combinedStaticRules))

          if (staticPermissions && staticPermissions.includes(scope)) {
            // static rule not provided for scope
            return true
          }

          /* // Dynamic rules setup */
          /* var combinedDynamicRules = [] */
          /* roles.map(role => { */
          /*   if (rules[role].dynamic) { */
          /*     var rulesArr = rules[role].dynamic */
          /*   } */
          /*   combinedDynamicRules.push(rulesArr) */
          /* }) */

          /* var combinedDynamicPermissions = uniq(flatten(combinedDynamicRules)) */

          /* const hasPermission = combinedDynamicPermissions.map( */
          /*   obj => Object.keys(obj)[0] */
          /* ) */

          /* if (hasPermission) { */
          /*   const permissionCondition = hasPermission.includes(scope) */
          /*   if (!permissionCondition) { */
          /*     return false */
          /*   } */

          /*   const keys = Object.keys(rules) */

          /*   var userHasRights = null */
          /*   keys.map(item => { */
          /*     if (rules[item].hasOwnProperty("dynamic")) { */
          /*       rules[item].dynamic.map(func => { */
          /*         if (func.hasOwnProperty(scope)) { */
          /*           userHasRights = func[scope] */
          /*         } */
          /*       }) */
          /*     } */
          /*   }) */

          /*   return userHasRights(data) */
          /* } */
          /* return false */
        }

        const sup = reducePermissions(rules, user.roles, expectedScopes)
        console.log("sup :", sup)

        /* // reduce roles and rules */
        /* field.resolve = async function(...args) { */
        /* // Get the required scope from the field first, falling back */
        /* // to the objectType if no scope is required by the field: */
        /*  const requiredScope = field._requiredScope || objectType._requiredScope */

        /* // args is an array of the resolver.  [2] is req object. */
        /* const userId = args[2].user */
        /* const ownerId = args[1].resource */

        /* const user = await getUserById(userId) */
        /* console.log("user; ", userId) */
        /* console.log("resource: ", ownerId) */

        /*    /1* @data: object *1/ */
        /* /1* { *1/ */
        /* /1* idusername, *1/ */
        /*    /1*   ownerId *1/ */
        /*    /1* } *1/ */

        /* const data = {userId, ownerId} */

        /* const sup = reducePermissions(rules, user.roles, scope, data) */
        /* console.log("sup :", sup) */

        /*  if (!requiredScope) { */

        /*    return resolve.apply(this, args) */

        /*  } */

        /*  return field.resolve.apply(this, args) */

        /* } */
        /* } */
        /* } */

        /* if (expectedScopes.some(role => roles.indexOf(role) !== -1)) { */
        /*   return result[fieldName] */
        /* } else { */
        /*   throw new Error("You are not authorized for this resource") */
        /* } */
      } catch (err) {
        return err
      }
    }
  }

  visitObject(obj) {
    const fields = obj.getFields()
    const expectedScopes = args.scopes

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName]
      field.resolve = async function(result, args, ctx, info) {
        try {
          if (expectedScopes.some(role => roles.indexOf(role) !== -1)) {
            return result[fieldName]
          }
          throw new Error("You are not authorized for this resource")
        } catch (err) {
          throw new Error("You are not authorized!!")
        }
      }
    })
  }
}
