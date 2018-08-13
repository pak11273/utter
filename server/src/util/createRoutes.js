import {decodeToken, getFreshUser} from '../auth/auth.js'
const checkUser = [decodeToken(), getFreshUser()]

module.exports = (controller, router) => {
  // router.param('id', controller.params)

  router
    .route('/')
    .get(controller.get)
    .post(controller.post)

  // router.route('/:id').get(controller.getOne)
}
