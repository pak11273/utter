import cuid from 'cuid'
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

exports.get = (req, res, next) => {
  const prom = new Promise(function(resolve, reject) {
    setTimeout(resolve, 100, 'foo')
  })
  prom.then(
    courses => {
      res.json(courses)
    },
    err => {
      next(err)
    }
  )
}

exports.getOne = (req, res, next) => {
  //populate doesn't return a promise, so call exec()
  // TODO: fix so you can use populate.  can't use populate yet because of "schema hasn't been registered for model user error"
  // Course.find().populate('subscribers').exec().then(
  console.log('creatorId: ', req.params.courseCreatorId)
  console.log('courseId: ', req.params.courseId)
  if (req.params.courseId) {
    Course.findOne({
      courseId: req.params.courseId,
      courseCreatorId: req.params.courseCreatorId
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

exports.deleteLevel = (req, res, next) => {
  Course.findOne(
    {courseId: req.params.courseId},
    (err, course) => {
      if (err) {
        console.log('err: ', err)
      }
      course.update(
        {$pull: {levels: {_id: req.params.levelId}}},
        (err, deleted) => {
          res.json(deleted)
        }
      )
    }
    // {$pullAll: {id: [req.params.levelId]}}
  )
}
