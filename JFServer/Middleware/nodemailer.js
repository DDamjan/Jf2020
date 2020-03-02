var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jobfairnisit@gmail.com',
      pass: 'JFNis2@2@'
    }
  });

  module.exports = {
    transporter
  }