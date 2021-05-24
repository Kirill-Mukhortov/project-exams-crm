const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  counter: {
    type: Number,
    default: 0,
  },
});

module.exports = model('User', userSchema);
