import mongoose from 'mongoose'
import faker from 'faker'
import cuid from 'cuid'
import isEmpty from 'lodash/isEmpty'

import Course from './courseModel.js'

exports.get = async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10)

  console.log('query: ', req.query)

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

    console.log('QUERY: ', query)

    // initial query
    console.log('initial query')
    if (!req.query.next || req.query.next === 'done') {
      var result = await Course.find(query)
        .populate('courseAuthor')
        .sort({_id: -1})
        .limit(limit)

      var totalRecords = await Course.find(query).countDocuments()

      if (totalRecords <= limit) {
        var next = 'done'
      } else {
        var next = result[result.length - 1]._id
      }
      console.log('result: ', result)
      res.json({result, next})
    } else {
      // remaining queries
      console.log('remaining queries')
      let next

      // if one of the keys in the query array has value then do a search on that value
      query._id = {$lt: req.query.next}
      result = await Course.find(query)
        .sort({_id: -1})
        .populate('courseAuthor')
        .limit(limit)

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
}

exports.getOne = (req, res, next) => {
  //populate doesn't return a promise, so call exec()
  // TODO: fix so you can use populate.  can't use populate yet because of "schema hasn't been registered for model user error"
  // Course.find().populate('subscribers').exec().then(
  console.log('creatorId: ', req.params.courseAuthorId)
  console.log('courseId: ', req.params.courseId)
  if (req.params.courseId) {
    Course.findOne({
      courseId: req.params.courseId,
      courseAuthorId: req.params.courseAuthorId
    }).then(
      course => {
        res.json({course})
      },
      err => {
        next(err)
      }
    )
  }
}

exports.params = (req, res, next, id) => {
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
}

exports.post = (req, res, next) => {
  let newCourse = req.body.course
  Course.create(newCourse).then(
    course => {
      res.json(course)
    },
    err => {
      next(err)
    }
  )
}

exports.unique = (req, res, next) => {
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
}

exports.faker = (req, res, next) => {
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
      'korean',
      'french',
      'spanish'
    ])
    course.subscribers = ['5b6b21e445912f4b8277bb06']
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
    course.image = faker.image.image()
    course.levels = [
      {
        course: course._id,
        level: 1,
        title: 'Change Me',
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
        title: 'Change Me',
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
        title: 'Change Me',
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
        title: 'Change Me',
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
}

exports.putOne = (req, res, next) => {
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
}

exports.getTeachingCourses = (req, res, next) => {
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
}

exports.update = (req, res, next) => {
  console.log('update')
  let update = req.body.course

  Course.findOneAndUpdate(
    {courseId: update.courseId},
    update,
    (err, course) => {
      if (err) {
        next(err)
      } else {
        res.json(course)
      }
    }
  )
}

// TODO: use this to delete whole courses.  levelId is actually the courseId
exports.deleteCourse = (req, res, next) => {
  console.log('reg: ', req.params.levelId)
  let id = req.params.levelId
  Course.findByIdAndRemove(id, (err, deleted) => {
    if (err) {
      next(err)
    } else {
      res.json(deleted)
    }
  })
}

exports.deleteLevel = (req, res, next) => {
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
