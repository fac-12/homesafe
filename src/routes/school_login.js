const bcryptjs = require('bcryptjs');
const check_school = require('../queries/check_school');
const check_school_password = require('../queries/check_school_password');
const search_pickups = require('../queries/search_pickups');
const check_school_verification = require('../queries/check_school_verification');
const {today_date} = require('../validators');

exports.post = (req, res) => {
  const school_details = req.body;
  check_school(school_details.school_Email_Login).then((queryRes) => {
      return new Promise((resolve, reject) => {
        if (queryRes[0].case === true) {
          resolve()
        } else {
          reject(new Error("User doesn't exist, please register"))
        }
      }).then(() =>
      check_school_verification(school_details.school_Email_Login))
      .then((queryRes) => {
        return new Promise((resolve, reject) => {

          if (queryRes[0].verified === true) {
            resolve();
          } else {
            reject(new Error("Please check and verify your email."))
          }
        })
      })
    .then(() =>
    check_school_password(school_details.school_Email_Login))
    .then((queryRes) => {
      const password = queryRes[0].password;
      const name = queryRes[0].name;
      const school_id = queryRes[0].id;
      req.session.name = name;
      req.session.school_id = school_id;
      return bcryptjs.compare(school_details.school_password_login, password);

    }).then((bcryptResponse) => {
      return new Promise((resolve, reject) => {

        if (bcryptResponse) {
          req.session.loggedin = true;
          req.flash("name", req.session.name)

          const today = today_date();

          search_pickups(req.session.school_id, today).then((queryRes) => {

            const query_result = JSON.parse(JSON.stringify(queryRes));
            const name = req.session.name;
            res.render('school_profile', {
              query_result,
              name
            });
          })

        } else {
          reject(new Error("this password is incorrect, please try again"));
        }
      })
    }).catch((err) => {
      if (err.message === "this password is incorrect, please try again") {
        req.flash("error_msg", err.message);
        res.redirect("/school_login_page");
      } else if (err.message === "user doesn't exist, please register") {
        req.flash("error_msg", err.message)
        res.redirect('/school_registration_form')
      } else if (err.message === "Please check and verify your email.") {
        req.flash("error_msg", err.message)
        res.redirect('/school_login_page')
      }else {
        res.status(500).render('error', {
          layout: 'error',
          statusCode: 500,
          errorMessage: 'Server Error',
        });

      }
    })
})
}
