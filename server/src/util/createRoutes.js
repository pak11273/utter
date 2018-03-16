import Course from '../api/course/courseModel.js'
module.exports = (controller, router) => {
  router.param('id', controller.params)

  router
    .route('/')
    .get(controller.get)
    .post(controller.post)

  router.route('/:id').get(controller.getOne)

  router
    .route('/:courseId/:courseName')
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete)
}
