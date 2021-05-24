const mongoose = require('mongoose');
const {
  dbConnectionURL,
  options,
  DB_NAME,
} = require('./config');

function dbConnect() {
  mongoose.connect(dbConnectionURL, options, (err) => {
    if (err) return console.log(err);
    console.log(`Успешно подключились к базе данных ${DB_NAME}`);
  });
}

module.exports = dbConnect;
