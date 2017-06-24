import superagent from 'superagent'

export default {
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
