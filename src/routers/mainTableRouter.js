const { Router } = require('express');
const { tableRender } = require('../controllers/mainTableController');
const { checkLogin } = require('../middlewares/checkLogin');
const { isAdmin } = require('../middlewares/isAdmin');
const { isUser } = require('../middlewares/isUser');
const { takeExamen } = require('../controllers/takeExamen');

const mainTableRouter = Router();

mainTableRouter.route('/table')
  .get(checkLogin, isAdmin, isUser, tableRender)
  .patch(takeExamen);

module.exports = mainTableRouter;
