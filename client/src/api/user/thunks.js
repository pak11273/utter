import {fetchData} from '../../utils/ApiMgr.js'

// function* getUser(url, data, params, cb) {
//   try {
//     console.log('here now')
//     const url = 'auth/signin'
//     const params = null
//     const cb = null
//     return (dispatch, getState) => {
//       // example url: '/teaching-course/:courseCreatorId/:courseId/:courseName')
//       return fetchData(url, data, params, cb).then(res => {
//         const token = res.data.token
//         localStorage.setItem('jwtToken', token)
//         setAuthorizationToken(token)
//         dispatch({
//           type: GET_USER_ASYNC.SUCCESS,
//           payload: res
//         })
//         const user = jwt.decode(token)
//         dispatch(setCurrentUser(user))
//         // sample id; "59d2a7bb24a8b73675b527d7"
//         // axios.get(`api/users/${user._id}`).then(res => {
//         //   dispatch(loadUserProfile(res.data))
//         // })
//       })
//     }
//     const users = yield call(fetchData(url, data, params, cb))
//     console.log('actions: ', actions)
//     yield put(actions.success(thing))
//   } catch (e) {
//     console.log(e)
//     yield put(actions.error(e))
//   }
// }

// export default function*() {
//   yield all([takeLatest(types.GET_USER.PENDING, getUser)])
// }
