const { Router } = require('express');
const { checkLogin } = require('../middlewares/checkLogin');
const { userRegistrationRender, userRegistration, userLoginRender, userLogin, userLogout, userFinder } = require('../controllers/userController');

const userRouter = Router();

userRouter.route('/registration')
  .get(checkLogin, userRegistrationRender)
  .post(userRegistration);

userRouter.route('/')
  .get(userLoginRender)
  .post(userLogin);

userRouter.route('/logout')
  .get(userLogout);

userRouter.route('/userslist')
  .get(userFinder);

module.exports = userRouter;
