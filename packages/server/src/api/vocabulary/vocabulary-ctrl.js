import mongoose from "mongoose"
import faker from "faker"
import {isEmpty} from "lodash"

import Vocabulary from "./vocabulary-model.js"
const ObjectId = mongoose.Types.ObjectId

export default {
  get: async (req, res, next) => {
    const limit = parseInt(req.query.limit, 10)

    // query builder
    var query = {}

    if (req.query.vocabularyName) {
      query.vocabularyName = new RegExp(`${req.query.vocabularyName}`, "i")
    }
    if (req.query.vocabularyRef) {
      query.vocabularyRef = new RegExp(`${req.query.vocabularyRef}`, "i")
    }
    if (req.query.vocabularyAuthor) {
      query.vocabularyAuthor = req.query.vocabularyAuthor
    }
    if (req.query.usingLang) {
      query.usingLang = req.query.usingLang
    }
    if (req.query.teachingLang) {
      query.teachingLang = req.query.teachingLang
    }

    try {
      // find vocabularyAuthorId from name
      if (req.query.vocabularyAuthor) {
        var vocabularyAuthor = await Vocabulary.findByUsername(
          req.query.vocabularyAuthor,
          (err, docs) => {
            if (err) {
              // console.log doesn't work here
            }
            if (!isEmpty(docs)) {
              var vocabularyAuthor = docs._id
              console.log("vocabulary author: ", vocabularyAuthor)
              query.vocabularyAuthor = vocabularyAuthor
            }
          }
        )
      }

      // initial query

      if (!req.query.next || req.query.next === "done") {
        var prePopResult = await Vocabulary.aggregate([
          {$match: query},
          {
            $project: {
              vocabularyName: 1,
              vocabularyDescription: 1,
              vocabularyRef: 1,
              vocabularyAuthor: 1,
              vocabularyImage: 1,
              subscribers: {$size: "$subscribers"}
            }
          },
          {$sort: {_id: -1}},
          {$limit: limit}
        ])

        var result = await Vocabulary.populate(prePopResult, {
          path: "vocabularyAuthor"
        })

        var totalRecords = await Vocabulary.find(query).countDocuments()
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

        var prePopResult = await Vocabulary.aggregate([
          {$match: query},
          {$sort: {_id: -1}},
          {$limit: limit},
          {
            $project: {
              vocabularyName: 1,
              vocabularyDescription: 1,
              vocabularyRef: 1,
              vocabularyAuthor: 1,
              vocabularyImage: 1,
              subscribers: {$size: "$subscribers"}
            }
          }
        ])

        var result = await Vocabulary.populate(prePopResult, {
          path: "vocabularyAuthor"
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
    if (req.params.vocabularyId) {
      Vocabulary.findOne({
        _id: req.params.vocabularyId,
        vocabularyAuthor: req.params.vocabularyAuthorId
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
    Vocabulary.findById(id).then(
      vocabulary => {
        if (!vocabulary) {
          next(new Error("No vocabulary with that id"))
        } else {
          req.vocabulary = vocabulary
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  createOne: (req, res, next) => {
    console.log("body: ", req.body.vocabulary)
    let newVocabulary = req.body.vocabulary
    newVocabulary.vocabularyAuthor = {
      _id: req.body.vocabulary.vocabularyAuthorId
    }
    Vocabulary.create(newVocabulary).then(
      vocabulary => {
        res.json(vocabulary)
      },
      err => {
        next(err)
      }
    )
  },

  unique: (req, res, next) => {
    Vocabulary.find({vocabularyName: req.body.vocabulary}).then(
      vocabulary => {
        if (!req.body.vocabulary) {
          res.status(400).json({error: "This field is required."})
        } else if (vocabulary.length > 0) {
          // next(new Error('This vocabulary name is already taken.'))
          res
            .status(400)
            .json({error: "This vocabulary name is already taken."})
        } else {
          res.json({msg: "This vocabulary name is available"})
        }
      },
      err => {
        next(err)
      }
    )
  },

  faker: (req, res, next) => {
    for (var i = 0; i < 3; ++i) {
      var vocabulary = new Vocabulary()

      console.log("vocabulary: ", vocabulary)
      // random object ids for <pending>
      var id1 = mongoose.Types.ObjectId()
      var id2 = mongoose.Types.ObjectId()
      var id3 = mongoose.Types.ObjectId()
      vocabulary.category = faker.commerce.department()
      vocabulary.vocabulary = faker.random.number()
      vocabulary.title = faker.random.arrayElement([
        "alphabet",
        "body parts",
        "bedroom"
      ])
      vocabulary.Course = faker.random.arrayElement([
        "5b6b21e445912f4b8277bb06",
        "5b6b21e445912f4b8277bb06",
        "5b6b21e445912f4b8277bb06"
      ])
      // TODO: change ids to ones in the db
      // vocabulary.subscribers = faker.random.arrayElement([
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
      vocabulary.vocabularyDescription =
        "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild."

      vocabulary.save(function(err) {
        if (err) throw err
      })
    }
    res.json(vocabulary)
  },

  putOne: (req, res, next) => {
    console.log("hellodog")
    // if (req.params.vocabularyId) {
    //   Vocabulary.findOne({vocabularyId: req.params.vocabularyId}).then(
    //     vocabulary => {
    //       res.json(vocabulary)
    //     },
    //     err => {
    //       next(err)
    //     }
    //   )
    // }
  },

  getTeachingVocabulary: (req, res, next) => {
    const pg = req.query.pg || 1
    const limit = 1000
    const offset = (pg - 1) * limit
    // const pageStart = 1
    // const numPages = 10
    Vocabulary.paginate(
      {vocabularyAuthorId: req.params.vocabularyAuthorId},
      {offset, limit, lean: true}
    )
      .then(function(result) {
        res.json({
          result
        })
      })
      .catch(error => {
        console.error({
          message: "Error occured while paginating Vocabulary data",
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

    // update a vocabulary's name
    if (update.type === "LEVEL_ASYNC_UPDATE") {
      Vocabulary.findOneAndUpdate(
        {"vocabulary._id": ObjectId(update.id)},
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
      // update a vocabulary
      Vocabulary.findOneAndUpdate(
        {_id: update.vocabularyId},
        update,
        (err, data) => {
          if (err) {
            next(err)
          } else {
            res.json({data})
          }
        }
      )
    }
  },

  remove: (req, res, next) => {
    console.log("reg: ", req.params)
    let id = req.params.vocabularyId
    Vocabulary.findByIdAndRemove(id, (err, deleted) => {
      if (err) {
        next(err)
      } else {
        res.json(deleted)
      }
    })
  },

  deleteVocabulary: (req, res, next) => {
    console.log("reg: ", req.params)
    let id = req.params.vocabularyId
    Vocabulary.findByIdAndRemove(id, (err, deleted) => {
      if (err) {
        next(err)
      } else {
        res.json(deleted)
      }
    })
  },

  deleteVocabulary: (req, res, next) => {
    Vocabulary.findOne(
      {vocabularyId: req.params.vocabularyId},
      (err, vocabulary) => {
        if (err) {
          console.log("err: ", err)
        }
        vocabulary.updateOne(
          {$pull: {vocabulary: {_id: req.params.vocabularyId}}},
          (err, deleted) => {
            res.json(deleted)
          }
        )
      }
      // {$pullAll: {id: [req.params.vocabularyId]}}
    )
  }
}
