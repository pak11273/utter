import axios from 'axios'

export default {
  get: (url, params) => {
    axios({
      url: url,
      method: 'get',
      params: params
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log('what thehell')
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
