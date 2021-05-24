const Table = require('../models/table.model');

const takeExamen = async (req, res) => {
  const { tableId } = req.body;
  await Table.findByIdAndUpdate(tableId, { $set: { examinator: req.session?.user?.id } });
  const table = await Table.findById(tableId).populate('examinator');
  return res.status(200).json(table);
}


module.exports = {
  takeExamen
};
