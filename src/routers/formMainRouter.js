const { Router } = require('express');
const { tableControllerRender,
} = require('../controllers/userController');

const tableRouter = Router();

tableRouter.route('/table')
  .get(tableControllerRender);

module.exports = tableRouter;
