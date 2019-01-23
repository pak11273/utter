/* import { AuthorizationError } from "./errors"; */
import * as jwt from "jsonwebtoken"
import {flatten, uniq} from "lodash"
import {SchemaDirectiveVisitor} from "apollo-server"
import {defaultFieldResolver} from "graphql"
import User from "../../api/user/user-model.js"

import rules from "@utterzone/common/dist/auth/roles-schema"

export class hasScopeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const {scope} = this.args

    field.resolve = async function(result, args, context, info) {
      const expectedRoles = this.args.roles
      if (!context || !context.headers || !context.headers.authorization) {
        throw new AuthorizationError({message: "No authorization token."})
      }

      const token = context.headers.authorization
      try {
        const id_token = token.replace("Bearer ", "")

        const decoded = jwt.verify(id_token, process.env.JWT_SECRET, {
          algorithms: ["RS256"]
        })
        const roles = decoded["https://grandstack.io/roles"]

        if (expectedRoles.some(role => roles.indexOf(role) !== -1)) {
          return result[fieldName]
        }

        throw new AuthorizationError({
          message: "You are not authorized for this resource"
        })
      } catch (err) {
        throw new AuthorizationError({
          message: "You are not authorized for this resource"
        })
      }
    }

    // fields are all fields(ie. getUserById, getLevelCount), including those from all types, User,Course, etc.
    const {resolve = defaultFieldResolver} = field

    const getUserById = userId => {
      const result = User.findById(userId).exec()
      return result
    }

    // TODO
    const getOwnerByResourceId = resourceId => {
      //
    }

    const reducePermissions = (rules, roles, scope, data) => {
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

      // Dynamic rules setup
      var combinedDynamicRules = []
      roles.map(role => {
        if (rules[role].dynamic) {
          var rulesArr = rules[role].dynamic
        }
        combinedDynamicRules.push(rulesArr)
      })

      var combinedDynamicPermissions = uniq(flatten(combinedDynamicRules))

      const hasPermission = combinedDynamicPermissions.map(
        obj => Object.keys(obj)[0]
      )

      if (hasPermission) {
        const permissionCondition = hasPermission.includes(scope)
        if (!permissionCondition) {
          return false
        }

        const keys = Object.keys(rules)

        var userHasRights = null
        keys.map(item => {
          if (rules[item].hasOwnProperty("dynamic")) {
            rules[item].dynamic.map(func => {
              if (func.hasOwnProperty(scope)) {
                userHasRights = func[scope]
              }
            })
          }
        })

        return userHasRights(data)
      }
      return false
    }

    // reduce roles and rules
    field.resolve = async function(...args) {
      // Get the required scope from the field first, falling back
      // to the objectType if no scope is required by the field:
      /* const requiredScope = field._requiredScope || objectType._requiredScope */
      // args is an array of the resolver.  [2] is req object.
      const userId = args[2].user
      const ownerId = args[1].resource

      const user = await getUserById(userId)
      console.log("user; ", userId)
      console.log("resource: ", ownerId)

      /*
        /** @data: object
				/** {  
				/**   idusername,  
        /**   ownerId  
        /** }
				 */

      const data = {userId, ownerId}

      const sup = reducePermissions(rules, user.roles, scope, data)
      console.log("sup :", sup)

      /* if (!requiredScope) { */
      /*   return resolve.apply(this, args) */
      /* } */

      /* return field.resolve.apply(this, args) */
    }
  }
}
