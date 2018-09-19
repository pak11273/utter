import {createAsyncTypes} from '../../utils/reduxUtils.js'

export const ACCOUNT_ASYNC = createAsyncTypes('ACCOUNT_ASYNC')
export const LOGIN_ASYNC = createAsyncTypes('LOGIN_ASYNC')
export const LOADER_ASYNC = createAsyncTypes('LOADER_ASYNC')
export const SIGNUP_ASYNC = createAsyncTypes('SIGNUP_ASYNC')
export const LOGOUT = 'utter/user/LOGOUT'
export const DEAUTHORIZE = 'utter/user/DEAUTHORIZE'
export const LOAD_USER_PROFILE = 'utter/user/LOAD_USER_PROFILE'
export const SET_CURRENT_USER = 'utter/user/SET_CURRENT_USER'
