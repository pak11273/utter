/* import { AuthorizationError } from "./errors"; */
import * as jwt from "jsonwebtoken"
import {flatten, uniq, union} from "lodash"
import {SchemaDirectiveVisitor} from "apollo-server"
import {userByToken} from "../../api/shared/resolver-functions.js"
import {defaultFieldResolver} from "graphql"
import rules from "@utterzone/common/dist/auth/roles-schema"

// resources
import User from "../../api/user/user-model.js"
import Course from "../../api/course/course-model.js"
import Level from "../../api/level/level-model.js"
import Term from "../../api/term/term-model.js"
import Zone from "../../api/zone/zone-model.js"

export class hasScopeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const expectedScope = this.args.scopes
    const {resolve = defaultFieldResolver} = field

    field.resolve = async (...args) => {
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

        var thing = this.reducePermissions(rules, user, expectedScope)

        /*   /1*  if (!requiredScope) { *1/ */
        return resolve.apply(this, args)
        /*   /1*  } *1/ */
        /*   /1*  return field.resolve.apply(this, args) *1/ */
        /*   /1* } *1/ */
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

  reducePermissions = async (rules, user, expectedScope) => {
    var roles = user.roles
    var hasDynamicPermissions = false
    var hasStaticPermissions = false

    // Users without roles get "guest" applied
    if (!roles) roles = ["guest"]

    // Flatten all dynamic rules
    const dynamicRules = []
    roles.map(role => {
      if (rules[role].dynamic) {
        dynamicRules.push(rules[role].dynamic)
      }
    })

    const combinedDynamicRules = uniq(flatten(dynamicRules))

    // Array of Keys for combinedDynamicRules
    const dynamicKeys = combinedDynamicRules.map(obj => Object.keys(obj)[0])

    // Static rules setup,flattened all user's static permissions
    const combinedRules = []
    roles.map(role => {
      combinedRules.push(rules[role].static)
    })
    combinedRules.push(dynamicKeys) //append dynamic keys

    const allPermissions = uniq(flatten(combinedRules))

    // See if user's roles has the permissions from expectedScope
    const containsPermission = this.arrayContainsAnotherArray(
      expectedScope,
      allPermissions
    )

    if (containsPermission) {
      const userId = user._id
      const resourceId = "Test"
      const passPermissionsArr = []

      await expectedScope.map(scope => {
        if (dynamicKeys.indexOf(scope) > -1) {
          roles.map(role => {
            rules[role].dynamic.map(obj => {
              const objName = Object.getOwnPropertyNames(obj)[0]
              const modelSlice = objName.slice(0, objName.indexOf(":"))
              const modelName =
                modelSlice[0].toUpperCase() + modelSlice.slice(1)

              if (obj.hasOwnProperty(scope)) {
                // make db call then
                /* const resourceId = null */
                Course.findOne({courseAuthor: userId}, (err, doc) => {
                  if (doc) {
                    const ownerId = doc.courseAuthor
                    console.log("props: ", userId.toObject())
                    console.log("id: ", typeof userId)
                    console.log("ownerId: ", typeof ownerId)
                    console.log(userId === ownerId)
                    console.log("funct: ", obj[scope])
                    passPermissionsArr.push(obj[scope](userId, ownerId))
                    console.log("array: ", passPermissionsArr)
                  }
                })
              }
            })
          })
        }
      })

      console.log("arry: ", passPermissionsArr)
      if (passPermissionsArr.includes(false)) return false
      if (passPermissionsArr.includes(true)) return true
    }

    if (containsPermission) {
      return true
    } else {
      return false
    }
  }
}
