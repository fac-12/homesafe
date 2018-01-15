const bcryptjs = require('bcryptjs');
const check_school = require('../queries/check_school');
const check_school_password = require('../queries/check_school_password');
const search_pickups = require('../queries/search_pickups');

exports.post = (req, res) => {
  const school_details = req.body;
  check_school(school_details.school_email_login).then((queryRes) => {
      return new Promise((resolve, reject) => {
        if (queryRes[0].case === true) {
          resolve()
        } else {
          reject(new Error("User doesn't exist, please register"))
        }
      })
    }).then(() => {
      return check_school_password(school_details.school_email_login)
    })
    .then((response) => {
      console.log(response);
      const password = response[0].password;
      const name = response[0].name;
      const school_id = response[0].id;
      req.session.name = name;
      req.session.school_id = school_id;
      return bcryptjs.compare(school_details.school_password_login, password);

    }).then((bcryptResponse) => {
      return new Promise((resolve, reject) => {

        if (bcryptResponse) {
          req.session.loggedin = true;
          req.flash("name", req.session.name)

          search_pickups(req.session.parent_id).then((queryRes) => {
            const query_result = JSON.stringify(queryRes);
            const parse_query_result = JSON.parse(query_result);
            res.render('parent_profile', {
              parse_query_result
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
      } else {
        res.status(500).render('error', {
          layout: 'error',
          statusCode: 500,
          errorMessage: 'Server Error',
        });
      }
    })
}
