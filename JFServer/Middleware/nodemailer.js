var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 's7.unlimited.rs',
    port: 465,
    secure: true,
    auth: {
      user: 'jfit@cv.jobfairnis.rs',
      pass: 'JFIT2@2@'
    }
  });

  module.exports = {
    transporter
  }