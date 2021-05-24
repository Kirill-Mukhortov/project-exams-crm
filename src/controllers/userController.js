const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { sendMailNewUser } = require('../middlewares/sendEmail');

const saltRound = 10;

const userRegistrationRender = (req, res) => res.render('registration');
const userLoginRender = (req, res) => res.render('index');

const userRegistration = async (req, res) => {
  const {
    name, role, email, password: plainPass, phoneNumber, counter,
  } = req.body;

  try {
    const password = await bcrypt.hash(plainPass, saltRound);

    const newUser = await User.create({
      name,
      role,
      email,
      password,
      phoneNumber,
      counter,
    });

    sendMailNewUser(newUser.email, newUser);

    req.session.user = {
      id: newUser._id,
      name: newUser.name,
      role: newUser.role,
      email: newUser.email,
      counter: newUser.counter,
    };

    return res.redirect('/user/table');
  } catch (error) {
    const message = 'Пользователь с таким email уже зарегистрированн';
    return res.status(400).render('registration', { error: message });
  }
};

const userLogin = async (req, res) => {
  const {
    email, password,
  } = req.body;

  if (email && password) {
    const message = 'Логин или пароль не верный';
    const currentUser = await User.findOne({
      email,
    });

    if (currentUser && (await bcrypt.compare(password, currentUser.password))) {
      // req.session.user = currentUser;

      req.session.user = {
        id: currentUser._id,
        name: currentUser.name,
        role: currentUser.role,
        email: currentUser.email,
        counter: currentUser.counter,
      };

      return res.redirect('/user/table');
    }

    return res.render('index', { error: message });
  }

  return res.status(400).redirect('/');
};

const userLogout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.redirect('/');

    res.clearCookie(req.app.get('cookieName'));

    return res.redirect('/');
  });
};

const userFinder = async (req, res) => {
  const users = await User.find({});
  const userMap = {};

  users.forEach((user) => {
    if (user.role === 'Экзаменатор') {
      userMap[user.name] = user._id;
    }
  });

  res.send(userMap);
};

module.exports = {
  userRegistrationRender,
  userRegistration,
  userLoginRender,
  userLogin,
  userLogout,
  userFinder,
};
