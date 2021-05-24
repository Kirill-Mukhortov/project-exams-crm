const nodemailer = require('nodemailer');
const bodyForEmailNewExam = require('../views/emailBodyView/emailBodiNewExam');
const bodyForEmailNewUser = require('../views/emailBodyView/bodyForEmailNewUser');

async function sendMailNewUser(emails, params) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.emailUser}`,
      pass: `${process.env.emailPassword}`,

    },
  });

  const info = await transporter.sendMail({
    from: `${process.env.emailFrom}`,
    to: `${emails}`,
    subject: 'Добро пожаловать!',
    html: `${bodyForEmailNewUser(params)}`,
  });

  console.log('Message sent: %s', info.messageId);
}

async function sendMailNewExamen(emails, params) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.emailUser}`,
      pass: `${process.env.emailPassword}`,
    },
  });

  const info = await transporter.sendMail({
    from: `${process.env.emailFrom}`,
    to: `${emails}`,
    subject: 'Новая заявка на экзамен',
    html: `${bodyForEmailNewExam(params)}`,
  });

  console.log('Message sent: %s', info.messageId);
}

module.exports = { sendMailNewUser, sendMailNewExamen };
