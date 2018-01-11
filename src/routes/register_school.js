const nodemailer = require('nodemailer')
let random_number = Math.floor((Math.random()*1000000)+60);


const registerSchool = (req, res) => {
  const school_details = req.body;
  let link = `http://${req.get('host')}/verify?id=${random_number}`;
console.log(link);
  const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'homesafefac@gmail.com',
    pass: process.env.email_password
  }
});

const mailOptions = {
  from: 'homesafefac@gmail.com',
  to: school_details.email,
  subject: 'Home safe email verification',
  html: `<p>${school_details.name}</p><p>Thank you for registering for home safe. Please follow the link below to verify your email address.</p><a href="${link}">${link}</a><p>Homesafeteam"`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
  console.log(school_details);

}

const verifySchool = (req, res) =>{
  let host = req.get('host')
if((`${req.protocol}://${req.get('host')}`)==(`http://${host}`)){
  console.log("req protocol");
  if(req.query.id==random_number){
    console.log("email is verified");
  } else {
    console.log("email is not verified");
    res.end("email is not verified")
  }
} else {
  console.log("unknown link: ", link);
  res.end("unknown link")
}
}

module.exports = {
  registerSchool,
  verifySchool
}
