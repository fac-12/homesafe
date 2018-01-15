const nodemailer = require('nodemailer');
const bcryptjs = require('bcryptjs');
const check_school = require('../queries/check_school');
const add_school = require('../queries/add_school');
const check_verification_number = require('../queries/check_verification_number');
const {
  school_registration_verification_email
} = require('../emails')
const update_verified_status = require('../queries/update_verified_status')
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
  }).then(()=>{
    return new Promise((resolve, reject) => {
      bcryptjs.hash(school_details.password, 10, (err, bcryptres) => {
        if (err) {
          reject(new Error("bcrypt error"))
        } else {
          resolve(bcryptres)
        }
      })
    })
  }).then((bcryptres) => {
    add_school(school_details.name, school_details.email, bcryptres, random_number, false)
  }).then(() => {
    school_registration_verification_email(school_details.email, school_details.name, link);
  }).then(() => {
    res.end('please check your email.')
  }).catch((err) => {
    if(err.message === "User already exists, please login"){
      req.flash("error_msg", err.message);
      res.redirect('/school_registration_form')
    }
    else{
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Server Error',
      });
    }
  })

}

const verifySchool = (req, res) => {
  if ((`${req.protocol}://${req.get('host')}`) == (`http://${host}`)) {
    check_verification_number(req.query.id).then((queryRes) => {
      return new Promise((resolve, reject) => {
        if (queryRes[0].verification_number !== req.query.id) {
          reject(new Error("Invalid verification"));
        } else {
          resolve()
        }
      })
    }).then(() => {
      return update_verified_status(req.query.id);
    }).then(() => {
      req.session.loggedin = true;
      req.session.verification_number = req.query.id;
      res.redirect('/school_profile')
    }).catch((err) => {
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Server Error',
      });
    })
  } else {
    res.end("unknown link")
  }
}

module.exports = {
  registerSchool,
  verifySchool
}
