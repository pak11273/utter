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
  visitObject(type) {
    this.ensureFieldsWrapped(type)
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType)
  }

  ensureFieldsWrapped(objectType) {
    /* try { */
    /*   // Mark the GraphQLObjectType object to avoid re-wrapping: */
    /*   if (objectType._authFieldsWrapped) return */
    /*   objectType._authFieldsWrapped = true */
    /*   const arrayContainsAnotherArray = (needle, haystack) => { */
    /*     for (var i = 0; i < needle.length; i++) { */
    /*       if (haystack.indexOf(needle[i]) === -1) return false */
    /*     } */
    /*     return true */
    /*   } */
    /*   // authenticate user */
    /*   const token = ctx.req.headers.authorization */
    /*   if (token === "null") { */
    /*     return new Error("You need to be registered to view this resource.") */
    /*   } */
    /*   const user = userByToken(token, (err, res) => { */
    /*     if (err) { */
    /*       return err */
    /*     } */
    /*     return res */
    /*   }) */
    /*   if (user === Error) return user */
    /*   console.log("user: ", user) */
    /*   const fields = objectType.getFields() */
    /*   const {resolve = defaultFieldResolver} = field */
    /*   Object.keys(fields).forEach(fieldName => { */
    /*     const field = fields[fieldName] */
    /*     field.resolve = async function(...args) { */
    /*       try { */
    /*         if (expectedScopes.some(role => roles.indexOf(role) !== -1)) { */
    /*           return result[fieldName] */
    /*         } */
    /*         throw new Error("You are not authorized for this resource") */
    /*       } catch (err) { */
    /*         throw new Error("You are not authorized!!") */
    /*       } */
    /*     } */
    /*   }) */
    /*   const {scopes} = this.args */
    /*   const expectedScopes = scopes */
    /*   // TODO turn all roles for user into flattened array of permissions */
    /*   /1* const reducePermissions = (rules, roles, expectedScope) => { *1/ */
    /*   /1*   console.log("roles: ", roles) *1/ */
    /*   /1*   // Users without roles get "guest" applied *1/ */
    /*   /1*   if (!roles) roles = ["guest"] *1/ */
    /*   /1*   // Static rules setup *1/ */
    /*   /1*   var combinedStaticRules = [] *1/ */
    /*   /1*   roles.map(role => { *1/ */
    /*   /1*     combinedStaticRules.push(rules[role].static) *1/ */
    /*   /1*   }) *1/ */
    /*   /1*   var combinedStaticPermissions = uniq(flatten(combinedStaticRules)) *1/ */
    /*   /1*   console.log("combinedStaticPermissions: ", combinedStaticPermissions) *1/ */
    /*   /1*   console.log("scope: ", expectedScope) *1/ */
    /*   /1*   var hasStaticPermissions = arrayContainsAnotherArray( *1/ */
    /*   /1*     expectedScope, *1/ */
    /*   /1*     combinedStaticPermissions *1/ */
    /*   /1*   ) *1/ */
    /*   // Dynamic rules setup */
    /*   /1* var combinedDynamicRules = [] *1/ */
    /*   /1* roles.map(role => { *1/ */
    /*   /1*   if (rules[role].dynamic) { *1/ */
    /*   /1*     var rulesArr = rules[role].dynamic *1/ */
    /*   /1*   } *1/ */
    /*   /1*   combinedDynamicRules.push(rulesArr) *1/ */
    /*   /1* }) *1/ */
    /*   /1* var combinedDynamicPermissions = uniq(flatten(combinedDynamicRules)) *1/ */
    /*   /1* const hasPermission = combinedDynamicPermissions.map( *1/ */
    /*   /1*   obj => Object.keys(obj)[0] *1/ */
    /*   /1* ) *1/ */
    /*   /1* if (hasPermission) { *1/ */
    /*   /1*   const permissionCondition = hasPermission.includes(scope) *1/ */
    /*   /1*   if (!permissionCondition) { *1/ */
    /*   /1*     return false *1/ */
    /*   /1*   } *1/ */
    /*   /1*   const keys = Object.keys(rules) *1/ */
    /*   /1*   var userHasRights = null *1/ */
    /*   /1*   keys.map(item => { *1/ */
    /*   /1*     if (rules[item].hasOwnProperty("dynamic")) { *1/ */
    /*   /1*       rules[item].dynamic.map(func => { *1/ */
    /*   /1*         if (func.hasOwnProperty(scope)) { *1/ */
    /*   /1*           userHasRights = func[scope] *1/ */
    /*   /1*         } *1/ */
    /*   /1*       }) *1/ */
    /*   /1*     } *1/ */
    /*   /1*   }) *1/ */
    /*   /1*   return userHasRights(data) *1/ */
    /*   /1* } *1/ */
    /*   /1* return false *1/ */
    /*   /1* var hasDynamicPermissions = false *1/ */
    /*   /1* if (hasStaticPermissions || hasDynamicPermissions) { *1/ */
    /*   /1*   return true *1/ */
    /*   /1* } else { *1/ */
    /*   /1*   return false *1/ */
    /*   /1* } *1/ */
    /*   /1* } *1/ */
    /*   console.log("scopes; ", expectedScopes) */
    /*   const sup = reducePermissions(rules, user.roles, expectedScopes) */
    /*   console.log("sup :", sup) */
    /*   /1* // reduce roles and rules *1/ */
    /*   /1* field.resolve = async function(...args) { *1/ */
    /*   /1* // Get the required scope from the field first, falling back *1/ */
    /*   /1* // to the objectType if no scope is required by the field: *1/ */
    /*   /1*  const requiredScope = field._requiredScope || objectType._requiredScope *1/ */
    /*   /1* // args is an array of the resolver.  [2] is req object. *1/ */
    /*   /1* const userId = args[2].user *1/ */
    /*   /1* const ownerId = args[1].resource *1/ */
    /*   /1* const user = await getUserById(userId) *1/ */
    /*   /1* console.log("user; ", userId) *1/ */
    /*   /1* console.log("resource: ", ownerId) *1/ */
    /*   /1*    /2* @data: object *2/ *1/ */
    /*   /1* /2* { *2/ *1/ */
    /*   /1* /2* idusername, *2/ *1/ */
    /*   /1*    /2*   ownerId *2/ *1/ */
    /*   /1*    /2* } *2/ *1/ */
    /*   /1* const data = {userId, ownerId} *1/ */
    /*   /1* const sup = reducePermissions(rules, user.roles, scope, data) *1/ */
    /*   /1* console.log("sup :", sup) *1/ */
    /*   /1*  if (!requiredScope) { *1/ */
    /*   /1*    return resolve.apply(this, args) *1/ */
    /*   /1*  } *1/ */
    /*   /1*  return field.resolve.apply(this, args) *1/ */
    /*   /1* } *1/ */
    /*   if (expectedScopes.some(role => roles.indexOf(role) !== -1)) { */
    /*     return resolve.apply(this, args) */
    /*   } else { */
    /*     throw new Error("You are not authorized for this resource") */
    /*   } */
    /* } catch (err) { */
    /*   return err */
    /* } */
  }
}
