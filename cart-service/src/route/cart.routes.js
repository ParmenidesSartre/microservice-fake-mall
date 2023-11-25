const router = require("express").Router();
const controller = require("../controller/cart.controller");
const validate = require("../middlewares/validate");
const validation = require("../validation/cart.validation");
const auth = require("../middlewares/auth");

// router
//   .route("/add/:productId")
//   .post(auth, validate(validation.add), controller.addToCart);

// router
//   .route("/remove/:productId")
//   .delete(auth, validate(validation.remove), controller.removeFromCart);

router
  .route("/")
  .get(auth, controller.getCart)
  .post(auth, controller.addProduct);

module.exports = router;
