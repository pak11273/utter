import React from 'react'
import axios from 'axios'

exports.userSignupRequest = userData => {
  return dispatch => {
    return axios.post('api/users/', userData)
  }
}
