import Course from './courseModel.js'
import _ from 'lodash'

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
  let newCourse = req.body

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
  console.log('req: ', req.body.course)
  if (!req.body.course) {
    res.status(400).json({error: 'This field is required.'})
  }
  // Put on client side to conserve request calls
  // if (req.body.course.length > 100 || req.body.course.length < 10) {
  //   res
  //     .status(400)
  //     .json({error: 'Course name needs to be 10 to 100 characters in length.'})
  // }
  Course.find({name: req.body.course}).then(
    course => {
      console.log('course: ', course)
      if (course.length > 0) {
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

exports.get = (req, res, next) => {
  //populate doesn't return a promise, so call exec()
  // TODO: fix so you can use populate.  can't use populate yet because of "schema hasn't been registered for model user error"
  // Course.find().populate('subscribers').exec().then(
  Course.find().then(
    courses => {
      res.json(courses)
    },
    err => {
      next(err)
    }
  )
}

exports.getOne = (req, res, next) => {
  let course = req.course
  res.json(course)
}

exports.update = (req, res, next) => {
  let course = req.course
  let update = req.body

  let saved = _.merge(course, update)

  course.save((err, saved) => {
    if (err) {
      next(err)
    } else {
      res.json(saved)
    }
  })
}

exports.delete = (req, res, next) => {
  req.course.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
