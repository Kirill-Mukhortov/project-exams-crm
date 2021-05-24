require('dotenv').config();
const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const path = require('path');
const hbs = require('hbs');
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const dbConnect = require('./src/config/connections');
const { dbConnectionURL } = require('./src/config/config');

const newExamenForm = require('./src/routers/newExamFormRouter');
const mainTableRouter = require('./src/routers/mainTableRouter');
const userRouter = require('./src/routers/userRegistrationRouter');

const app = express();
const PORT = process.env.PORT || 3000;

const { secretKey } = process.env;
dbConnect();

app.set('view engine', 'hbs');
app.set('cookieName', 'sid');
app.set('views', path.join(process.env.PWD, 'src', 'views'));
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(sessions({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/elbroos_exams',
  }),
  cookie: {
    httpOnly: true,
    maxAge: 86400 * 1e3,
  },
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(process.env.PWD, 'src', 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  res.locals.user = req.session.user;

  next();
});

app.use('/', userRouter);
app.use('/user', mainTableRouter);
app.use('/user', newExamenForm);

app.use((req, res, next) => {
  const error = createError(404, 'Запрашиваемой страницы не существует на сервере.');
  next(error);
});

// --------------! Обработчик ошибок !----------------

app.use((err, req, res, next) => {
  const appMode = req.app.get('env');
  let error;

  if (appMode === 'development') {
    error = err;
  } else {
    error = {};
  }

  res.locals.message = err.message;
  res.locals.error = error;

  res.status(err.status || 500);
  res.render('error');
});

// --------------! Запуск сервера !----------------

app.listen(PORT, () => {
  console.log('Server started on port ', PORT);
});
