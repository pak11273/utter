import superagent from 'superagent'
import axios from 'axios'

export default {
  fetch: (url, params, cb) => {
    // third party api
    // example of url '/teaching-course/:courseCreatorId/:courseId/:courseName')
    axios
      .get(url)
      .then(function(response) {
        console.log(response)
      })
      .catch(function(error) {
        console.log(error)
      })
  },

  get: (url, params, cb) => {
    superagent
      .get(url)
      .query(params)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          cb(err, null)
          return
        }
        const confirmation = res.body.confirmation
        if (confirmation != 'success') {
          cb({message: res.body.message}, null)
          return
        }
        cb(null, res.body)
      })
  },

  post: (url, data, cb) => {
    superagent
      .post(url)
      .send(data)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          cb(err, null)
          return
        }
        const confirmation = res.body.confirmation
        if (confirmation != 'success') {
          cb({message: res.body.message}, null)
          return
        }
        cb(null, res.body)
      })
  },

  put: () => {},

  delete: () => {}
}
