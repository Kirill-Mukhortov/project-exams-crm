const { Router } = require('express');
const { newFormRender, newForm, editFormRender, editForm, deleteForm } = require('../controllers/formController');

const newExamenForm = Router();

newExamenForm.route('/table/')
  .get(newFormRender)
  .post(newForm);

newExamenForm.route('/table/:id/edit')
  .get(editFormRender)
  .patch(editForm);

newExamenForm.route('/table/')
  .delete(deleteForm);

module.exports = newExamenForm;
