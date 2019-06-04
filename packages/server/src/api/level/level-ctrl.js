import mongoose from "mongoose"
import faker from "faker"
/* import cuid from "cuid" */
import {isEmpty} from "lodash"

import Level from "./level-model.js"
const ObjectId = mongoose.Types.ObjectId

export default {
  get: async (req, res, next) => {
    const limit = parseInt(req.query.limit, 10)

    // query builder
    var query = {}

    if (req.query.levelName) {
      query.levelName = new RegExp(`${req.query.levelName}`, "i")
    }
    if (req.query.levelRef) {
      query.levelRef = new RegExp(`${req.query.levelRef}`, "i")
    }
    if (req.query.levelAuthor) {
      query.levelAuthor = req.query.levelAuthor
    }
    if (req.query.usingLang) {
      query.usingLang = req.query.usingLang
    }
    if (req.query.teachingLang) {
      query.teachingLang = req.query.teachingLang
    }

    try {
      // find levelAuthorId from name
      if (req.query.levelAuthor) {
        var levelAuthor = await Level.findByUsername(
          req.query.levelAuthor,
          (err, docs) => {
            if (err) {
              // console.log doesn't work here
            }
            if (!isEmpty(docs)) {
              var levelAuthor = docs._id
              console.log("level author: ", levelAuthor)
              query.levelAuthor = levelAuthor
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
              levelName: 1,
              levelDescription: 1,
              levelRef: 1,
              levelAuthor: 1,
              levelImage: 1,
              subscribers: {$size: "$subscribers"}
            }
          },
          {$sort: {_id: -1}},
          {$limit: limit}
        ])

        var result = await Level.populate(prePopResult, {
          path: "levelAuthor"
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
              levelName: 1,
              levelDescription: 1,
              levelRef: 1,
              levelAuthor: 1,
              levelImage: 1,
              subscribers: {$size: "$subscribers"}
            }
          }
        ])

        var result = await Level.populate(prePopResult, {
          path: "levelAuthor"
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
    if (req.params.levelId) {
      Level.findOne({
        _id: req.params.levelId,
        levelAuthor: req.params.levelAuthorId
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
      level => {
        if (!level) {
          next(new Error("No level with that id"))
        } else {
          req.level = level
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  createOne: (req, res, next) => {
    console.log("body: ", req.body.level)
    let newLevel = req.body.level
    newLevel.levelAuthor = {
      _id: req.body.level.levelAuthorId
    }
    Level.create(newLevel).then(
      level => {
        res.json(level)
      },
      err => {
        next(err)
      }
    )
  },

  unique: (req, res, next) => {
    Level.find({levelName: req.body.level}).then(
      level => {
        if (!req.body.level) {
          res.status(400).json({error: "This field is required."})
        } else if (level.length > 0) {
          // next(new Error('This level name is already taken.'))
          res.status(400).json({error: "This level name is already taken."})
        } else {
          res.json({msg: "This level name is available"})
        }
      },
      err => {
        next(err)
      }
    )
  },

  faker: (req, res, next) => {
    for (var i = 0; i < 3; ++i) {
      var level = new Level()

      console.log("level: ", level)
      // random object ids for <pending>
      var id1 = mongoose.Types.ObjectId()
      var id2 = mongoose.Types.ObjectId()
      var id3 = mongoose.Types.ObjectId()
      level.category = faker.commerce.department()
      level.level = faker.random.number()
      level.title = faker.random.arrayElement([
        "alphabet",
        "body parts",
        "bedroom"
      ])
      level.Course = faker.random.arrayElement([
        "5b6b21e445912f4b8277bb06",
        "5b6b21e445912f4b8277bb06",
        "5b6b21e445912f4b8277bb06"
      ])
      // TODO: change ids to ones in the db
      // level.subscribers = faker.random.arrayElement([
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
      level.levelDescription =
        "Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild."

      level.save(function(err) {
        if (err) throw err
      })
    }
    res.json(level)
  },

  putOne: (req, res, next) => {
    console.log("hellodog")
    // if (req.params.levelId) {
    //   Level.findOne({levelId: req.params.levelId}).then(
    //     level => {
    //       res.json(level)
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
      {levelAuthorId: req.params.levelAuthorId},
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

    // update a level's name
    if (update.type === "LEVEL_ASYNC_UPDATE") {
      Level.findOneAndUpdate(
        {"levels._id": ObjectId(update.id)},
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
      // update a level
      Level.findOneAndUpdate({_id: update.levelId}, update, (err, data) => {
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
    let id = req.params.levelId
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
    let id = req.params.levelId
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
      {levelId: req.params.levelId},
      (err, level) => {
        if (err) {
          console.log("err: ", err)
        }
        level.updateOne(
          {$pull: {levels: {_id: req.params.levelId}}},
          (err, deleted) => {
            res.json(deleted)
          }
        )
      }
      // {$pullAll: {id: [req.params.levelId]}}
    )
  }
}
