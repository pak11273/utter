import reduxCrud from 'redux-crud'
import axios from 'axios'
import _ from 'lodash'
import cuid from 'cuid'
const cid = cuid()

const baseActionCreators = reduxCrud.actionCreatorsFor('phrase')

let actionCreators = {
  fetch(level) {
    return (dispatch, getState) => {
      const action = baseActionCreators.fetchStart()
      dispatch(action)

      // api request
      const url = '/api/phrases'
      if (!level) {
        level = '1'
      }
      const promise = axios({
        url,
        params: {
          level: level
        }
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
  create(phrase) {
    return (dispatch, getState) => {
      // Generate a cid so we can match the records
      var cid = cuid()
      phrase = _.merge(phrase, {id: cid})

      const action = baseActionCreators.createStart(phrase)
      dispatch(action)

      // api request
      const url = '/api/phrases'
      console.log('phrase: ', phrase)
      const promise = axios({
        url,
        method: 'POST',
        data: phrase
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
            const errorAction = baseActionCreators.createError(res, phrase)
            dispatch(errorAction)
          }
        )
        .catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },

  update(phrase) {
    return function(dispatch) {
      // optimistic update
      console.log('phrase in actions: ', phrase)
      const action = baseActionCreators.updateStart(phrase)
      dispatch(action)

      // api request
      const url = `/api/phrases/${phrase._id}`
      const promise = axios({
        url,
        method: 'PUT',
        data: {
          phrase
        }
      })

      promise
        .then(
          function(response) {
            const returnedPhrase = response.data.data
            const action = baseActionCreators.updateSuccess(returnedPhrase)
            dispatch(action)
          },
          function(response) {
            const action = baseActionCreators.updateError(response, phrase)
            dispatch(action)
          }
        )
        .catch(function(err) {
          console.error(err.toString())
        })

      return promise
    }
  },

  delete(phrase) {
    return function(dispatch) {
      const optimisticAction = baseActionCreators.deleteStart(phrase)
      dispatch(optimisticAction)

      const url = `/api/phrases/${phrase._id}`
      const promise = axios({
        url,
        method: 'DELETE'
      })

      promise
        .then(
          function(response) {
            // dispatch the success action
            const successAction = baseActionCreators.deleteSuccess(phrase)
            dispatch(successAction)
          },
          function(response) {
            // rejection
            // dispatch the error action
            const errorAction = baseActionCreators.deleteError(response, phrase)
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
