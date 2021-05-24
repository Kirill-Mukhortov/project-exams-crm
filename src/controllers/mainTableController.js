const Table = require('../models/table.model');

const tableRender = async (req, res, next) => {
  const table = await Table.find().find().populate('examinator');
  res.render('formMain', { table });
};

module.exports = { tableRender };
