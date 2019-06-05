import mongoose from "mongoose"
import faker from "faker"
import cuid from "cuid"
import {isEmpty} from "lodash"

import Level from "./term-model.js"
const ObjectId = mongoose.Types.ObjectId

export default {
  get: async (req, res, next) => {
    const limit = parseInt(req.query.limit, 10)

    // query builder
    var query = {}

    if (req.query.termName) {
      query.termName = new RegExp(`${req.query.termName}`, "i")
    }
    if (req.query.termRef) {
      query.termRef = new RegExp(`${req.query.termRef}`, "i")
    }
    if (req.query.termAuthor) {
      query.termAuthor = req.query.termAuthor
    }
    if (req.query.usingLang) {
      query.usingLang = req.query.usingLang
    }
    if (req.query.teachingLang) {
      query.teachingLang = req.query.teachingLang
    }

    try {
      // find termAuthorId from name
      if (req.query.termAuthor) {
        var termAuthor = await Level.findByUsername(
          req.query.termAuthor,
          (err, docs) => {
            if (err) {
              // console.log doesn't work here
            }
            if (!isEmpty(docs)) {
              var termAuthor = docs._id
              console.log("term author: ", termAuthor)
              query.termAuthor = termAuthor
            }
          }
        )
      }

      // initial query

      if (!req.query.next || req.query.next === "done") {
        var prePopResult = await Level.aggregate([
          {$match: query},
          {
            $project: {
              termName: 1,
              termDescription: 1,
              termRef: 1,
              termAuthor: 1,
              termImage: 1,
              subscribers: {$size: "$subscribers"}
            }
          },
          {$sort: {_id: -1}},
          {$limit: limit}
        ])

        var result = await Level.populate(prePopResult, {
          path: "termAuthor"
        })

        var totalRecords = await Level.find(query).countDocuments()
        console.log("rec: ", totalRecords)

        if (totalRecords <= limit) {
          var next = "done"
        } else {
          var next = result[result.length - 1]._id
        }
        res.json({result, next})
      } else {
        // remaining queries
        console.log("remaining queries")
        let next

        // type cast id, $lt is not the same in aggregate vs query
        next = mongoose.Types.ObjectId(req.query.next)
        // add to query object
        query._id = {$lt: next}

        var prePopResult = await Level.aggregate([
          {$match: query},
          {$sort: {_id: -1}},
          {$limit: limit},
          {
            $project: {
              termName: 1,
              termDescription: 1,
              termRef: 1,
              termAuthor: 1,
              termImage: 1,
              subscribers: {$size: "$subscribers"}
            }
          }
        ])

        var result = await Level.populate(prePopResult, {
          path: "termAuthor"
        })

        var lastResultId = ""

        if (!isEmpty(lastResultId)) {
          lastResultId = result[result.length - 1]._id.toString()
        }

        if (isEmpty(result)) {
          next = "done"
          res.json({result, next})
        } else {
          next = result[result.length - 1]._id
          console.log("next: ", next)
          res.json({result, next})
        }
      }
    } catch (error) {
      console.log("err: ", error)
      next = "done"
      // res.json({result, next, err: error})
    }
  },

  getOne: (req, res, next) => {
    if (req.params.termId) {
      Level.findOne({
        _id: req.params.termId,
        termAuthor: req.params.termAuthorId
      }).then(
        data => {
          res.json({data})
        },
        err => {
          next(err)
        }
      )
    }
  },

  findByParams: (req, res, next, id) => {
    Level.findById(id).then(
      term => {
        if (!term) {
          next(new Error("No term with that id"))
        } else {
          req.term = term
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  createOne: (req, res, next) => {
    console.log("body: ", req.body.term)
    let newLevel = req.body.term
    newLevel.termAuthor = {
      _id: req.body.term.termAuthorId
    }
    Level.create(newLevel).then(
      term => {
        res.json(term)
      },
      err => {
        next(err)
      }
    )
  },

  unique: (req, res, next) => {
    Level.find({termName: req.body.term}).then(
      term => {
        if (!req.body.term) {
          res.status(400).json({error: "This field is required."})
        } else if (term.length > 0) {
          // next(new Error('This term name is already taken.'))
          res.status(400).json({error: "This term name is already taken."})
        } else {
          res.json({msg: "This term name is available"})
        }
      },
      err => {
        next(err)
      }
    )
  },

  faker: (req, res, next) => {
    for (var i = 0; i < 3; ++i) {
      var term = new Level()

      console.log("term: ", term)
      // random object ids for terms.term
      var id1 = mongoose.Types.ObjectId()
      var id2 = mongoose.Types.ObjectId()
      var id3 = mongoose.Types.ObjectId()
      var id4 = mongoose.Types.ObjectId()
      term.category = faker.commerce.department()
      term.termRef = faker.random.arrayElement([
        "TTMIK",
        "Topik Level 1",
        "How to study Korean"
      ])
      term.teachingLang = faker.random.arrayElement([
        "korean",
        "french",
        "spanish"
      ])
      term.usingLang = faker.random.arrayElement([
        "english",
        "french",
        "spanish"
      ])
      // TODO: change ids to ones in the db
      // term.subscribers = faker.random.arrayElement([
      //   ["5b6b21e445912f4b8277bb06"],
      //   ["5b6b21e445912f4b8277bb06", "5b9012f043aa4329f187f01a"],
      //   [
      //     "5b6b21e445912f4b8277bb06",
      //     "5b93f9184d034f51d0e72287",
      //     "5b9012f043aa4329f187f01a"
      //   ],
      //   ["5b9012f043aa4329f187f01a"],
      //   ["5b9012f043aa4329f187f01a", "5b93f9184d034f51d0e72287"],
      //   [
      //     "5b9012f043aa4329f187f01a",
      //     "5b6b21e445912f4b8277bb06",
      //     "5b93f9184d034f51d0e72287"
      //   ],
      //   ["5b93f9184d034f51d0e72287"],
      //   ["5b93f9184d034f51d0e72287", "5b6b21e445912f4b8277bb06"],
      //   [
      //     "5b93f9184d034f51d0e72287",
      //     "5b9012f043aa4329f187f01a",
      //     "5b93f9184d034f51d0e72287"
      //   ]
      // ])
      term.termId = cuid()
      term.termAuthor = faker.random.arrayElement([
        "5b9012f043aa4329f187f01a",
        "5b93f90c4d034f51d0e72286",
        "5baf12a86b73051f6295172b"
      ])
      term.termName = faker.commerce.productName()
      term.price = faker.commerce.price()
      term.termDescription =
        "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild."
      term.termImage = faker.image.image()
      term.terms = [
        {
          term: term._id,
          term: 1,
          name: "Change Me",
          terms: [
            {
              term: id1,
              word: "hello",
              translation: "안영"
            },
            {
              term: id1,
              word: "world",
              translation: "세상"
            }
          ]
        },
        {
          term: term._id,
          term: 2,
          name: "Change Me",
          terms: [
            {
              term: id2,
              word: "bart",
              translation: "안영"
            },
            {
              term: id2,
              word: "sympson",
              translation: "세상"
            }
          ]
        },
        {
          term: term._id,
          term: 4,
          name: "Change Me",
          terms: [
            {
              term: id3,
              word: "cat",
              translation: "안영"
            },
            {
              term: id3,
              word: "dog",
              translation: "세상"
            }
          ]
        },
        {
          term: term._id,
          term: 10,
          name: "Change Me",
          terms: [
            {
              term: id4,
              word: "merlin",
              translation: "안영"
            },
            {
              term: id4,
              word: "samson",
              translation: "세상"
            }
          ]
        }
      ]

      // console.log('term', term.terms[i]._id)
      term.save(function(err) {
        if (err) throw err
      })
    }
    res.json(term)
  },

  putOne: (req, res, next) => {
    console.log("hellodog")
    // if (req.params.termId) {
    //   Level.findOne({termId: req.params.termId}).then(
    //     term => {
    //       res.json(term)
    //     },
    //     err => {
    //       next(err)
    //     }
    //   )
    // }
  },

  getTeachingLevels: (req, res, next) => {
    const pg = req.query.pg || 1
    const limit = 1000
    const offset = (pg - 1) * limit
    // const pageStart = 1
    // const numPages = 10
    Level.paginate(
      {termAuthorId: req.params.termAuthorId},
      {offset, limit, lean: true}
    )
      .then(function(result) {
        res.json({
          result
        })
      })
      .catch(error => {
        console.error({
          message: "Error occured while paginating Level data",
          arguments: arguments
        })
        throw error // TODO: test return instead of throw
      })

    // More advanced example
    // var query = {};
    // var options = {
    //   select: 'title date author',
    //   sort: { date: -1 },
    //   populate: 'author',
    //   lean: true,
    //   offset: 20,
    //   limit: 10
    // };
  },

  updateOne: (req, res, next) => {
    const update = req.body

    // update a term's name
    if (update.type === "LEVEL_ASYNC_UPDATE") {
      Level.findOneAndUpdate(
        {"terms._id": ObjectId(update.id)},
        {$set: {name: update.name}},
        (err, data) => {
          if (err) {
            next(err)
          } else {
            res.json({data})
          }
        }
      )
    } else {
      // update a term
      Level.findOneAndUpdate({_id: update.termId}, update, (err, data) => {
        if (err) {
          next(err)
        } else {
          res.json({data})
        }
      })
    }
  },

  remove: (req, res, next) => {
    console.log("reg: ", req.params)
    let id = req.params.termId
    Level.findByIdAndRemove(id, (err, deleted) => {
      if (err) {
        next(err)
      } else {
        res.json(deleted)
      }
    })
  },

  deleteLevel: (req, res, next) => {
    console.log("reg: ", req.params)
    let id = req.params.termId
    Level.findByIdAndRemove(id, (err, deleted) => {
      if (err) {
        next(err)
      } else {
        res.json(deleted)
      }
    })
  },

  deleteLevel: (req, res, next) => {
    Level.findOne(
      {termId: req.params.termId},
      (err, term) => {
        if (err) {
          console.log("err: ", err)
        }
        term.updateOne(
          {$pull: {terms: {_id: req.params.termId}}},
          (err, deleted) => {
            res.json(deleted)
          }
        )
      }
      // {$pullAll: {id: [req.params.termId]}}
    )
  }
}
