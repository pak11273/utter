/* import { AuthorizationError } from "./errors"; */
import * as jwt from "jsonwebtoken"
import {flatten, uniq} from "lodash"
import {SchemaDirectiveVisitor} from "apollo-server"
import {userByToken} from "../../api/shared/resolver-functions.js"
import {defaultFieldResolver} from "graphql"

import rules from "@utterzone/common/dist/auth/roles-schema"

// resources
import User from "../../api/user/user-model.js"
import Course from "../../api/course/course-model.js"
import Level from "../../api/level/level-model.js"
import Term from "../../api/term/term-model.js"
import Test from "../../api/test/test-model.js"
import Zone from "../../api/zone/zone-model.js"

// register resources
const resources = [
  {user: User},
  {course: Course},
  {level: Level},
  {term: Term},
  {test: Test},
  {zone: Zone}
]

export class hasScopeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const expectedScope = this.args.scope
    const {resolve = defaultFieldResolver} = field

    field.resolve = async (...args) => {
      const resourceId = args[1].resourceId
      console.log("RESOURCE ID: ", resourceId)
      const token = args[2].req.headers.authorization
      if (token === "null") {
        return new Error("You need to be registered to view this resource.")
      }
      try {
        const user = await userByToken(token, (err, res) => {
          if (err) return err
          return res
        })
        if (user.name === "JsonWebTokenError") {
          throw new Error(
            "Please be aware.  Due to suspicious activities, we are monitoring actions from your ip now."
          )
        }

        var resource = await this.hasPermission(
          rules,
          user,
          resourceId,
          expectedScope
        )

        console.log("resource: ", resource)

        if (resource instanceof Error) {
          return resource
        }

        console.log("owner: ", resource.owner)
        console.log("user: ", user._id)

        if (JSON.stringify(resource.owner) === JSON.stringify(user._id)) {
          return resolve.apply(this, args)
        } else {
          return new Error("You are not the owner of this resource.")
        }

        /*   /1*  return field.resolve.apply(this, args) *1/ */
      } catch (err) {
        return err
      }
    }
  }

  arrayContainsAnotherArray = (needle, haystack) => {
    for (var i = 0; i < needle.length; i++) {
      if (haystack.indexOf(needle[i]) === -1) return false
    }
    return true
  }

  hasPermission = async (rules, user, resourceId, expectedScope) => {
    try {
      var roles = user.roles

      // Users without roles get "guest" applied
      if (!roles) roles = ["guest"]

      // Flatten all dynamic rules of the user
      const dynamicRules = []
      roles.map(role => {
        if (rules[role].dynamic) {
          dynamicRules.push(rules[role].dynamic)
        }
      })

      const combinedDynamicRules = flatten(dynamicRules)

      // Array of Keys for combinedDynamicRules
      const dynamicKeys = uniq(
        combinedDynamicRules.map(obj => Object.keys(obj)[0])
      )

      // Static rules setup,flattened all user's static permissions
      const combinedRules = []
      roles.map(role => {
        combinedRules.push(rules[role].static)
      })
      combinedRules.push(dynamicKeys) //append dynamic keys

      const allPermissions = uniq(flatten(combinedRules))

      // See if user's roles has the permissions from expectedScope
      const containsPermission = allPermissions.includes(expectedScope)

      // This is where we resolve dynamic permissions
      if (containsPermission) {
        const userId = user._id

        // Go through user dynamic permissions
        const key = dynamicKeys.find(ele => {
          if (ele === expectedScope) return ele
        })
        const modelSlice = key.slice(0, key.indexOf(":"))
        const modelName = modelSlice[0] + modelSlice.slice(1)
        const Model = resources.find(obj => {
          return Object.keys(obj)[0] === modelName
        })
        // make db call
        const result = await Model[modelName].findById(resourceId)
        if (result) {
          return result
        } else {
          console.log("error: ", result)
          return new Error(
            "Wrong resource was queried please contact technical support."
          )
        }
      } else {
        return new Error(
          "You do not have the right privileges for this resource."
        )
      }
    } catch (err) {
      return err
    }
  }
}
