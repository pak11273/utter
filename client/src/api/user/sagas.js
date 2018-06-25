import {all, call, put, take, takeLatest} from 'redux-saga/effects'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
import {actions} from './actions.js'
import * as types from './types'
import {fetchData} from '../../utils/apiMgr'
// import {SET_CURRENT_USER} from '../../api/user/actions.js'
import setAuthorizationToken from '../../utils/setAuthorizationToken.js'

function* login(state) {
  try {
    const {identifier, password} = state
    const url = 'auth/signin'
    const data = {identifier, password}
    const cb = null
    const params = null

    /**
     * @param {string} url ex.'/teaching-course/:courseCreatorId/:courseId/:courseName'
     */
    const response = yield call(fetchData, {url, data, params, cb})

    if (response.status >= 200 && response.status < 300) {
      // yield put({SET_CURRENT_USER, res})
      yield put({
        type: types.LOGIN_ASYNC.SUCCESS,
        payload: response
      })
    } else {
      throw response
    }
  } catch (error) {
    yield put({
      type: types.LOGIN_ASYNC.ERROR,
      payload: error.response.data.errors
    })
  } finally {
  }
}

function* watchLogin() {
  yield all([takeLatest(types.LOGIN_ASYNC.LOADING, login)])
}

export default [watchLogin]
