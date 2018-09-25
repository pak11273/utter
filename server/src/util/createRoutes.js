import {decodeToken, getFreshUser} from '../auth/auth.js'
const checkUser = [decodeToken(), getFreshUser()]

export default (controller, router) => {
  router
    .route('/')
    .get(controller.get)
    .post(controller.post)
}
