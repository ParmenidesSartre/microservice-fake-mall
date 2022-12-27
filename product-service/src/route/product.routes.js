const router = require("express").Router();
const controller = require("../controller/product.controller");
const validate = require("../middlewares/validate");
const validation = require("../validation/product.validation");
const auth = require("../middlewares/auth");

router.route("/category/:slug").get(auth, controller.getCategory);
router
  .route("/category")
  .get(auth, controller.getCategories)
  .post(auth, validate(validation.createCategory), controller.createCategory);

router
  .route("/:slug")
  .get(auth, controller.getProduct)
  .put(auth, validate(validation.updateProduct), controller.updateProduct)
  .delete(auth, controller.deleteProduct);

router
  .route("/")
  .get(auth, controller.getProducts)
  .post(auth, validate(validation.createProduct), controller.createProduct);
module.exports = router;
