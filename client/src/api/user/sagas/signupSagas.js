import {browserHistory} from 'react-router'
import {push} from 'react-router-redux'
import {all, call, put, take, takeLatest} from 'redux-saga/effects'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import {actions} from '../actions/signupActions.js'

// actions
import * as types from '../types'

import {fetchData} from '../../../utils/apiMgr'
// import {SET_CURRENT_USER} from '../../api/user/actions.js'

export function* authorize(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem('jwtToken', token)
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

export function* deAuthorize() {
  localStorage.setItem('jwtToken', null)
  delete axios.defaults.headers.common['Authorization']
}

export function* signup(state) {
  try {
    const {username, email, password} = state
    const url = 'api/users'
    const method = 'post'
    const data = {username, email, password}
    const cb = null
    const params = null

    /**
     * @param {object} data
     */
    const res = yield call(fetchData, {url, method, data, params, cb})

    if (res.status >= 200 && res.status < 300) {
      // yield put({SET_CURRENT_USER, res})
      yield put({
        type: types.SIGNUP_ASYNC.SUCCESS,
        payload: res
      })
        //TODO implement
        // this.props.addFlashMessage({
        //   type: 'success',
        //   text: 'You signed up successfully. Welcome aboard.'
        // })
        // this.props.history.push('/')
        // })
        // .then(() => {
        // const {username, password, isLoading, errors} = this.state
        // const loginState = {
        //   identifier: username,
        //   password,
        //   isLoading,
        //   errors
        // }

        // this.props.actions.login(loginState)
        // })

        .catch(error => {
          this.setState({errors: error.response.data.errors})
        })
      const token = res.data.token

      yield call(authorize, token)
      yield put(push('/dashboard'))

      //TODO this may not belong
      const user = jwt.decode(token)
    } else {
      throw res
    }
  } catch (error) {
    if (!error.response) {
      yield put({
        type: types.SIGNUP_ASYNC.ERROR,
        payload: error.message || 'Something went wrong.'
      })
    } else {
      console.log('error: ', error.message)
      console.log('fomr error: ', error)
      const err = error.response.data.errors.form
      yield put({
        type: types.SIGNUP_ASYNC.ERROR,
        payload: error
      })
    }
  } finally {
  }
}

function* watchSignup() {
  yield all([takeLatest(types.SIGNUP_ASYNC.LOADING, signup)])
}

function* watchDeAuthorize() {
  yield all([takeLatest(types.DEAUTHORIZE, deAuthorize)])
}

export default [watchDeAuthorize, watchSignup]
