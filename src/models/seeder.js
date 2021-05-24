const {
  connect,
  connection
} = require('mongoose');
const User = require('./user.model');
const Table = require('./table.model');

async function main() {
  await connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });

  const users = [{
      name: 'Igor',
      role: 'User',
      email: 'igor@mail.ru',
      password: '123',
      phoneNumber: '+71234567',
    },
    {
      name: 'Nastya',
      role: 'User',
      email: 'igor@mail.ru',
      password: '123',
      phoneNumber: '+71234567',
    },
    {
      name: 'Kirill',
      role: 'User',
      email: 'igor@mail.ru',
      password: '123',
      phoneNumber: '+71234567',
    }
  ];

  const table = [{
    studentName: 'Ivanov Ivan',
    day: '01',
    month: 'январь',
    year: '2021',
    hour: '14',
    minute: '20',
    curator: 'Anna',
  }];

  await User.insertMany(users);
  await Table.insertMany(table);

  await connection.close();
}

main();
