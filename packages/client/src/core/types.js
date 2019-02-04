import {createAsyncTypes} from "../utils/redux-utils.js"

export const LOADER_ASYNC = createAsyncTypes("LOADER_ASYNC")
export const FLASH_ASYNC = createAsyncTypes("FLASH_ASYNC")
export const DATA_LOADED = createAsyncTypes("DATA_LOADED")

export const ADD_FLASH_MESSAGE = "utter/auth/ADD_FLASH_MESSAGE"
export const DELETE_FLASH_MESSAGE = "utter/auth/DELETE_FLASH_MESSAGE"
export const LOAD_USER_PROFILE = "utter/auth/LOAD_USER_PROFILE"
export const LOAD_USER_PROFILE_FULFILLED =
  "utter/auth/LOAD_USER_PROFILE_FULFILLED"
export const SET_CURRENT_USER = "utter/auth/SET_CURRENT_USER"
export const SET_SEARCH_TERM = "utter/auth/SET_SEARCH_TERM"
export const ADD_ROOM = "utter/auth/ADD_ROOM"
export const TOGGLE_FOOTER = "utter/footer/TOGGLE_FOOTER"
