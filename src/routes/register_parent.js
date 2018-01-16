const add_parent = require("../queries/add_parent");
const bcryptjs = require('bcryptjs');
const check_parent = require('../queries/check_parent');
const {
  validateEmail
} = require('../validators')


exports.post = (req, res) => {
  const parent_details = req.body;
  check_parent(parent_details.email)
  .then((queryRes) => {
    return new Promise((resolve, reject) => {
      if (queryRes[0].case === true) {
        reject(new Error("User already exists, please login"))

      } else {
        resolve()
      }
    })
  })
  .then(() => {
    return validateEmail(parent_details.email)
  })
  .then((email) => {
    parent_details.email = email;
  })
  .then(() => {
    return new Promise((resolve, reject) => {
      bcryptjs.hash(parent_details.password, 10, (err, bcryptres) => {
        if (err) {
          reject(new Error("bcrypt error"))
        } else {
          resolve(bcryptres)
        }
      })
    })
  })
  .then((bcryptres) => {
    parent_details.password = bcryptres;
  })
  .then(() => {
    return add_parent(parent_details)
  })
  .then((queryRes) => {
    req.session.loggedin = true;
    req.session.parent_id = queryRes[0].id;
    req.session.name = req.body.first_name;
    res.redirect('/parent_profile')
  })
  .catch((err) => {
    if (err.message === "User already exists, please login") {
      req.flash("error_msg", err.message);
      res.redirect('/parent_profile')
    } else if (err.message === "Please make sure you have entered a valid email.") {
      req.flash("error_msg", err.message)
      res.redirect('/parent_registration_form')
    } else {
      res.status(500).render('error', {
        layout: 'error',
        statusCode: 500,
        errorMessage: 'Server Error',
      });
    }
  })
}
