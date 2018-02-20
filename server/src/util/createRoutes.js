import Course from '../api/course/courseModel.js'
module.exports = (controller, router) => {
  router.param('id', controller.params)

  router
    .route('/')
    .get(controller.get)
    .post(controller.post)

  router
    .route('/id/:id')
    .get(controller.getOne)
    .put(controller.update)
    .delete(controller.delete)
}
