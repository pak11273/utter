import mongoose from 'mongoose'
import faker from 'faker'
import cuid from 'cuid'
import isEmpty from 'lodash/isEmpty'

import Course from './courseModel.js'
const ObjectId = require('mongoose').Types.ObjectId

export default {
  get: async (req, res, next) => {
    console.log('get off me')
    const limit = parseInt(req.query.limit, 10)

    // query builder
    var query = {}

    if (req.query.courseName) {
      query.courseName = new RegExp(`${req.query.courseName}`, 'i')
    }
    if (req.query.courseRef) {
      query.courseRef = new RegExp(`${req.query.courseRef}`, 'i')
    }
    if (req.query.courseAuthor) {
      query.courseAuthor = req.query.courseAuthor
    }
    if (req.query.nativeLang) {
      query.nativeLang = req.query.nativeLang
    }
    if (req.query.teachingLang) {
      query.teachingLang = req.query.teachingLang
    }

    try {
      // find courseAuthorId from name
      if (req.query.courseAuthor) {
        var courseAuthor = await Course.findByUsername(
          req.query.courseAuthor,
          (err, docs) => {
            if (err) {
              // console.log doesn't work here
            }
            if (!isEmpty(docs)) {
              var courseAuthor = docs._id
              console.log('course author: ', courseAuthor)
              query.courseAuthor = courseAuthor
            }
          }
        )
      }

      // initial query

      if (!req.query.next || req.query.next === 'done') {
        var prePopResult = await Course.aggregate([
          {$match: query},
          {
            $project: {
              courseName: 1,
              courseDescription: 1,
              courseRef: 1,
              courseAuthor: 1,
              courseImage: 1,
              subscribers: {$size: '$subscribers'}
            }
          },
          {$sort: {_id: -1}},
          {$limit: limit}
        ])

        var result = await Course.populate(prePopResult, {
          path: 'courseAuthor'
        })

        var totalRecords = await Course.find(query).countDocuments()

        if (totalRecords <= limit) {
          var next = 'done'
        } else {
          var next = result[result.length - 1]._id
        }

        res.json({result, next})
      } else {
        // remaining queries
        console.log('remaining queries')
        let next

        // type cast id, $lt is not the same in aggregate vs query
        var next = mongoose.Types.ObjectId(req.query.next)
        // add to query object
        query._id = {$lt: next}

        var prePopResult = await Course.aggregate([
          {$match: query},
          {$sort: {_id: -1}},
          {$limit: limit},
          {
            $project: {
              courseName: 1,
              courseDescription: 1,
              courseRef: 1,
              courseAuthor: 1,
              courseImage: 1,
              subscribers: {$size: '$subscribers'}
            }
          }
        ])

        var result = await Course.populate(prePopResult, {
          path: 'courseAuthor'
        })

        var lastResultId = ''

        if (!isEmpty(lastResultId)) {
          lastResultId = result[result.length - 1]._id.toString()
        }

        if (isEmpty(result)) {
          next = 'done'
          res.json({result, next})
        } else {
          next = result[result.length - 1]._id
          console.log('next: ', next)
          res.json({result, next})
        }
      }
    } catch (error) {
      // console.log('err: ', error)
      next = 'done'
      res.json({result, next, err: error})
    }
  },

  getOne: (req, res, next) => {
    if (req.params.courseId) {
      Course.findOne({
        _id: req.params.courseId,
        courseAuthor: req.params.courseAuthorId
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

  params: (req, res, next, id) => {
    Course.findById(id).then(
      course => {
        if (!course) {
          next(new Error('No course with that id'))
        } else {
          req.course = course
          next()
        }
      },
      err => {
        next(err)
      }
    )
  },

  post: (req, res, next) => {
    console.log('body: ', req.body.course)
    let newCourse = req.body.course
    newCourse.courseAuthor = {
      _id: req.body.course.courseAuthorId
    }
    Course.create(newCourse).then(
      course => {
        res.json(course)
      },
      err => {
        next(err)
      }
    )
  },

  unique: (req, res, next) => {
    Course.find({courseName: req.body.course}).then(
      course => {
        if (!req.body.course) {
          res.status(400).json({error: 'This field is required.'})
        } else if (course.length > 0) {
          // next(new Error('This course name is already taken.'))
          res.status(400).json({error: 'This course name is already taken.'})
        } else {
          res.json({msg: 'This course name is available'})
        }
      },
      err => {
        next(err)
      }
    )
  },

  faker: (req, res, next) => {
    for (var i = 0; i < 3; ++i) {
      var course = new Course()

      // random object ids for terms.level
      var id1 = require('mongoose').Types.ObjectId()
      var id2 = require('mongoose').Types.ObjectId()
      var id3 = require('mongoose').Types.ObjectId()
      var id4 = require('mongoose').Types.ObjectId()
      course.category = faker.commerce.department()
      course.courseRef = faker.random.arrayElement([
        'TTMIK',
        'Topik Level 1',
        'How to study Korean'
      ])
      course.teachingLang = faker.random.arrayElement([
        'korean',
        'french',
        'spanish'
      ])
      course.nativeLang = faker.random.arrayElement([
        'english',
        'french',
        'spanish'
      ])
      course.subscribers = faker.random.arrayElement([
        ['5b6b21e445912f4b8277bb06'],
        ['5b6b21e445912f4b8277bb06', '5b9012f043aa4329f187f01a'],
        [
          '5b6b21e445912f4b8277bb06',
          '5b93f9184d034f51d0e72287',
          '5b9012f043aa4329f187f01a'
        ],
        ['5b9012f043aa4329f187f01a'],
        ['5b9012f043aa4329f187f01a', '5b93f9184d034f51d0e72287'],
        [
          '5b9012f043aa4329f187f01a',
          '5b6b21e445912f4b8277bb06',
          '5b93f9184d034f51d0e72287'
        ],
        ['5b93f9184d034f51d0e72287'],
        ['5b93f9184d034f51d0e72287', '5b6b21e445912f4b8277bb06'],
        [
          '5b93f9184d034f51d0e72287',
          '5b9012f043aa4329f187f01a',
          '5b93f9184d034f51d0e72287'
        ]
      ])
      course.courseId = cuid()
      course.courseAuthor = faker.random.arrayElement([
        '5b9012f043aa4329f187f01a',
        '5b93f90c4d034f51d0e72286',
        '5b93f9184d034f51d0e72287'
      ])
      course.courseName = faker.commerce.productName()
      course.price = faker.commerce.price()
      course.courseDescription =
        'Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.'
      course.courseImage = faker.image.image()
      course.levels = [
        {
          course: course._id,
          level: 1,
          name: 'Change Me',
          terms: [
            {
              level: id1,
              word: 'hello',
              translation: '안영'
            },
            {
              level: id1,
              word: 'world',
              translation: '세상'
            }
          ]
        },
        {
          course: course._id,
          level: 2,
          name: 'Change Me',
          terms: [
            {
              level: id2,
              word: 'bart',
              translation: '안영'
            },
            {
              level: id2,
              word: 'sympson',
              translation: '세상'
            }
          ]
        },
        {
          course: course._id,
          level: 4,
          name: 'Change Me',
          terms: [
            {
              level: id3,
              word: 'cat',
              translation: '안영'
            },
            {
              level: id3,
              word: 'dog',
              translation: '세상'
            }
          ]
        },
        {
          course: course._id,
          level: 10,
          name: 'Change Me',
          terms: [
            {
              level: id4,
              word: 'merlin',
              translation: '안영'
            },
            {
              level: id4,
              word: 'samson',
              translation: '세상'
            }
          ]
        }
      ]

      // console.log('course', course.levels[i]._id)
      course.save(function(err) {
        if (err) throw err
      })
    }
    res.json(course)
  },

  putOne: (req, res, next) => {
    console.log('hellodog')
    // if (req.params.courseId) {
    //   Course.findOne({courseId: req.params.courseId}).then(
    //     course => {
    //       res.json(course)
    //     },
    //     err => {
    //       next(err)
    //     }
    //   )
    // }
  },

  getTeachingCourses: (req, res, next) => {
    const pg = req.query.pg || 1
    const limit = 1000
    const offset = (pg - 1) * limit
    // const pageStart = 1
    // const numPages = 10
    Course.paginate(
      {courseAuthorId: req.params.courseAuthorId},
      {offset, limit, lean: true}
    )
      .then(function(result) {
        res.json({
          result
        })
      })
      .catch(error => {
        console.error({
          message: 'Error occured while paginating Course data',
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

  update: (req, res, next) => {
    const update = req.body

    // update a level's name
    if (update.type === 'LEVEL_ASYNC_UPDATE') {
      Course.findOneAndUpdate(
        {'levels._id': ObjectId(update.id)},
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
      // update a course
      Course.findOneAndUpdate({_id: update.courseId}, update, (err, data) => {
        if (err) {
          next(err)
        } else {
          res.json({data})
        }
      })
    }
  },

  deleteCourse: (req, res, next) => {
    console.log('reg: ', req.params)
    let id = req.params.courseId
    Course.findByIdAndRemove(id, (err, deleted) => {
      if (err) {
        next(err)
      } else {
        res.json(deleted)
      }
    })
  },

  deleteLevel: (req, res, next) => {
    Course.findOne(
      {courseId: req.params.courseId},
      (err, course) => {
        if (err) {
          console.log('err: ', err)
        }
        course.updateOne(
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
