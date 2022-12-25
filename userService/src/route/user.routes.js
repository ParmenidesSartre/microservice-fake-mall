const router = require('express').Router();
const controller = require('../controller/user.controller');
const validate = require('../middlewares/validate');
const validation = require('../validation/user.validation');
const auth = require('../middlewares/auth');

router
  .route('/')
  .get(auth, controller.getUsers)
  .post((req, res) => {
    res.send('POST request to the homepage');
  })
  .put((req, res) => {
    res.send('PUT request to the homepage');
  })
  .delete((req, res) => {
    res.send('DELETE request to the homepage');
  });

router
  .route('/register')
  .post(validate(validation.createUser), controller.createUser)
  .put((req, res) => {
    res.send(`PUT request to user ${req.params.user_id}`);
  })
  .delete((req, res) => {
    res.send(`DELETE request to user ${req.params.user_id}`);
  });

router
  .route('/login')
  .post(validate(validation.loginUser), controller.loginUser);

router.route('/logout').post(auth, controller.logoutUser);

router
  .route('/profile')
  .get(auth, controller.getUserById)
  .put(auth, validate(validation.updateUser), controller.updateUser);

router
  .route('/password')
  .put(auth, validate(validation), controller.updatePassword);


module.exports = router;
