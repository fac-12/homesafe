const nodemailer = require('nodemailer');
const check_school = require('../queries/check_school');
const add_school = require('../queries/add_school');
const check_verification_number = require('../queries/check_verification_number');
let host = "";
const registerSchool = (req, res) => {
  const school_details = req.body;
  let random_number = Math.floor((Math.random() * 1000000) + 60);
  host = req.get('host')
  let link = `http://${req.get('host')}/verify?id=${random_number}`;
  console.log(link);
  check_school(school_details.email).then((queryRes) => {
    return new Promise((resolve, reject) => {
      if (queryRes[0].case === true) {
        reject(new Error("User already exists, please login"));
      } else {
        resolve()
      }
    })
  }).then(() => {
    add_school(school_details.name, school_details.email, school_details.password, random_number.toString(), false)
  }).then(() => {
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

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }).then(() => {
    res.end('please check your email.')
  }).catch((err)=>{
    throw err;
  })

}

const verifySchool = (req, res) => {

  console.log("hello");
  console.log("req: ", req.query.id);
//   if ((`${req.protocol}://${req.get('host')}`) == (`http://${host}`)) {
  //   console.log(`${req.protocol}://${req.get('host')}`) == (`http://${host}`);
   console.log(check_verification_number(req.query.id))
   //).then((queryRes)=>{
     //console.log(queryRes);
   //})
 }
  //  .then((queryRes)=>{
  //    console.log("query res: ", queryRes);
  //     return new Promise((resolve, reject) => {
  //       console.log("query res: ", queryRes);
  //       if (queryRes.rows[0].verification_number !== req.query.id) {
  //         reject(new Error("Invalid verification"));
  //       } else {
  //         resolve()
  //       }
  //     })
  //   }).then(()=>{
  //     return update_verified_status(req.query.id);
  //   }).then(()=>{
  //     req.session.loggedin = true;
  //     req.session.verification_number = req.query.id;
  //     res.redirect('/school_profile')
  //   }).catch((err)=>{
  //     throw err;
  //   })
  // }
//     else {
//     console.log("unknown link: ", link);
//     res.end("unknown link")
//   }
// }

module.exports = {
  registerSchool,
  verifySchool
}
