import express from 'express'
import _ from 'lodash'
const wtfRouter = express.Router()

// test url
wtfRouter.route('/').get(function(req, res) {
  res.json({
    rows: [
      {
        GT_RowId: 2, // optional
        id: 2, // if there is no GT_RowId - try to fetch "id"
        title: 'Test 2st row',
        desc:
          '<input type="text" name="ttl" value="Test 2nd row Test 2nd row Test 2nd row Test 2st row Test 2st row" /> ',
        date: '20:40:37 17:06:2015',
        info: 'some info some info some info some info'
      },
      {
        GT_RowId: 1,
        id: 1,
        title: 'Test 1st row',
        desc:
          '<input type="text" name="ttl" value="Test 1st row Test 1st row Test 1st row Test 1st row Test 1st row" /> ',
        date: '20:40:38 17:06:2015',
        info: 'some info some info some info some info'
      }
    ]
  })
})

module.exports = wtfRouter
