const Table = require('../models/table.model');
const User = require('../models/user.model');
const { sendMailNewExamen } = require('../middlewares/sendEmail');

const newFormRender = (req, res) => res.render('newExamForm');

const editFormRender = async (req, res) => {
  const table = await Table.findById(req.params.id);

  const users = await User.find({});

  const userMap = [];
  users.forEach((user) => {
    userMap.push({ _id: user._id, name: user.name });
  });

  res.render('editExamForm', { userMap, table });
};

const newForm = async (req, res) => {
  const { studentName, day, month, year, hour, minute } = req.body;

  if (studentName && day && month && year && hour && minute) {
    await Table.create({ studentName, day, month, year, hour, minute, curator: req.session.user.name });

    const users = await User.find({});
    const userMap = [];
    users.forEach((user) => {
      if (user.role === 'Экзаменатор') {
        userMap.push(user.email);
      }
    });

    sendMailNewExamen(userMap, req.body);

    return res.redirect('/user/table');
  }

  return res.status(406).redirect('/form');
};

const editForm = async (req, res) => {
  await Table.findByIdAndUpdate(req.params.id, req.body);

  return res.sendStatus(200);
};

const deleteForm = async (req, res) => {
  await Table.findByIdAndDelete(req.body.id);

  return res.sendStatus(200);
};

module.exports = {
  newFormRender,
  newForm,
  editFormRender,
  editForm,
  deleteForm,
};
