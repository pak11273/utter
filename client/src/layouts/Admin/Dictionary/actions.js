import reduxCrud from 'redux-crud'
import axios from 'axios'
import _ from 'lodash'
import cuid from 'cuid'
const cid = cuid()

const baseActionCreators = reduxCrud.actionCreatorsFor('word')

let actionCreators = {
  fetch() {
    return (dispatch, getState) => {
      const action = baseActionCreators.fetchStart()
      dispatch(action)

      // api request
      const url = '/api/dictionary'
      const promise = axios({
        url
      })

      promise
        .then(
          res => {
            const returned = res.data
            returned.id = cid
            const successAction = baseActionCreators.fetchSuccess(returned)
            dispatch(successAction)
          },
          function(res) {
            // On rejection dispatch the error action
            const errorAction = baseActionCreators.fetchError(res)
            dispatch(errorAction)
          }
        )
        .catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },
  create(word) {
    return (dispatch, getState) => {
      // Generate a cid so we can match the records
      var cid = cuid()
      word = _.merge(word, {id: cid})

      const action = baseActionCreators.createStart(word)
      dispatch(action)

      // api request
      const url = '/api/dictionary'
      const promise = axios({
        url,
        method: 'POST',
        data: word
      })

      promise
        .then(
          res => {
            const returned = res.data
            returned.id = cid
            const successAction = baseActionCreators.createSuccess(
              returned,
              cid
            )
            dispatch(successAction)
          },
          function(res) {
            // On rejection dispatch the error action
            const errorAction = baseActionCreators.createError(res, word)
            dispatch(errorAction)
          }
        )
        .catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },
  update() {
    word
  },
  delete(word) {
    return function(dispatch) {
      const optimisticAction = baseActionCreators.deleteStart(word)
      dispatch(optimisticAction)

      const url = `/api/dictionary/${word._id}`
      const promise = axios({
        url,
        method: 'DELETE'
      })

      promise
        .then(
          function(response) {
            // dispatch the success action
            const successAction = baseActionCreators.deleteSuccess(word)
            dispatch(successAction)
          },
          function(response) {
            // rejection
            // dispatch the error action
            const errorAction = baseActionCreators.deleteError(response, word)
            dispatch(errorAction)
          }
        )
        .catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  }
}

actionCreators = Object.assign(baseActionCreators, actionCreators)

export default actionCreators
