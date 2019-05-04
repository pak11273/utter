import {decodeToken, getFreshUser} from "../auth"
const checkUser = [decodeToken(), getFreshUser()]

export default (controller, router) => {
  router.param('id', controller.findByParams)

  router
    .route("/")
    .get(controller.get)
    .post(controller.createOne)

  router
    .route("/:id")
    .get(controller.getOne)
    .put(controller.updateOne)
    .delete(controller.remove)
}
