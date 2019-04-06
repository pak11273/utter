import isEmpty from "lodash/isEmpty"
import config from "../../config"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import Course from "../course/course-model"
import PostModel from "./post-model"
import {userByToken} from "../shared/resolver-functions.js"

const escapeRegex = text => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

const Post = async (_, args, {user}) => {
  console.log("args: ", args)

  return {
    id: "jsldjfsjdlj",
    title: "ehllo",
    views: 3,
    user_id: "lksjdflksjdljfklj"
  }
}

const allPosts = async (_, args, {user}) => {
  console.log("args: ", args)
  /* const post = await Post.findById(postId).exec() */
  /* if (!post) { */
  /*   throw new Error("Cannot find post with id") */
  /* } */

  return [{}]
}

const _allPostsMeta = async (_, args, {user}) => {
  console.log("hello")
  /* const post = await Post.findById(postId).exec() */
  /* if (!post) { */
  /*   throw new Error("Cannot find post with id") */
  /* } */

  return {count: 3}
}

const createPost = async (_, args, {user}) => {
  console.log("hello")

  return {
    id: "jsldjfsjdlj",
    title: "ehllo",
    views: 3,
    user_id: "lksjdflksjdljfklj"
  }
}
const updatePost = async (_, args, {user}) => {
  console.log("hello")

  return {
    id: "jsldjfsjdlj",
    title: "ehllo",
    views: 3,
    user_id: "lksjdflksjdljfklj"
  }
}
const deletePost = async (_, args, {user}) => {
  console.log("hello")

  return {
    id: "jsldjfsjdlj",
    title: "ehllo",
    views: 3,
    user_id: "lksjdflksjdljfklj"
  }
}

export const postResolvers = {
  Query: {
    Post,
    allPosts,
    _allPostsMeta
  },
  Mutation: {
    createPost,
    updatePost,
    deletePost
  }
}
