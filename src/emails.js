const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'homesafefac@gmail.com',
    pass: process.env.PASSWORD,
  }
});

const parent_pickup_confirmation_email = (parent_email) => {
  const parent_email_confirmation = {
    from: 'homesafefac@gmail.com',
    to: parent_email,
    subject: 'HomeSafe-Pickup confirmation',
    html: `<p> Hello, </p>
  <p>This is to confirm your new schedule pick up has been sent to your child's school.</p>
  <p>Thank you for using HomeSafe</p>`
  };

  transporter.sendMail(parent_email_confirmation, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

const da_pickup_confirmation_email = (da_email, keyword) => {
  const da_email_confirmation = {
    from: 'homesafefac@gmail.com',
    to: da_email,
    subject: 'HomeSafe-Pickup confirmation',
    html: `<p> Hello, </p>
  <p>This is to confirm you have been assigned as a desginate adult. Your pick up keyword is ${keyword}. Please arrive on time to pick up the child. </p>
  <p>Thank you for using HomeSafe</p>`
  };


  transporter.sendMail(da_email_confirmation, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  parent_pickup_confirmation_email,
  da_pickup_confirmation_email
}
