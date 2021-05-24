const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const tableSchema = new Schema({
  studentName: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  minute: {
    type: String,
    required: true,
  },
  curator: String,
  examinator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  group: String,
  attempt: String,
  zoomLink: String,
  result: String,
});

module.exports = model('Table', tableSchema);
