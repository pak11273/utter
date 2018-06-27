import {createAsyncTypes} from '../../utils/reduxUtils.js'

export const LOGIN_ASYNC = createAsyncTypes('LOGIN_ASYNC')
export const LOGOUT = 'utter/user/LOGOUT'
export const DEAUTHORIZE = 'utter/user/DEAUTHORIZE'
export const LOAD_USER_PROFILE = 'utter/user/LOAD_USER_PROFILE'
export const SET_CURRENT_USER = 'utter/user/SET_CURRENT_USER'
