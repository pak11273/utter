import Course from './courseModel.js'
import faker from 'faker'
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
  for (var i = 0; i < 6; i++) {
    var course = new Course()

    course.category = faker.commerce.department()
    course.courseId = cuid()
    course.courseCreatorId = '5a7b329229e36c244bde6368'
    course.courseName = faker.commerce.productName()
    course.price = faker.commerce.price()
    course.courseDescription =
      'Nothing but a chicken wing. I dont like chicken wings, I like buffalo spicy hot wings with a little bit of wine.  There is nothing wrong with the sauce in chicken wings, but its so mild.'
    course.image = faker.image.image()
    course.levels = [{level: 1, title: 'Change Me'}]

    course.save(function(err) {
      if (err) throw err
    })
  }
  res.json(course)
}

exports.get = (req, res, next) => {
  //populate doesn't return a promise, so call exec()
  // TODO: fix so you can use populate.  can't use populate yet because of "schema hasn't been registered for model user error"
  // Course.find().populate('subscribers').exec().then(
  if (req.params.courseId) {
    Course.findOne({courseId: req.params.courseId}).then(
      course => {
        res.json(course)
      },
      err => {
        next(err)
      }
    )
  }
}

exports.getTeachingCourses = (req, res, next) => {
  const pg = req.query.pg || 1
  const limit = 10
  const offset = (pg - 1) * limit
  // const pageStart = 1
  // const numPages = 10
  Course.paginate(
    {courseCreatorId: req.params.courseCreatorId},
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

exports.delete = (req, res, next) => {
  req.course.remove((err, removed) => {
    if (err) {
      next(err)
    } else {
      res.json(removed)
    }
  })
}
