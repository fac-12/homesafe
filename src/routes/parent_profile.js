const bcryptjs = require('bcryptjs');
const check_parent = require('../queries/check_parent');
const check_parent_password = require('../queries/check_parent_password');


exports.post = (req, res) => {
  const parent_details = req.body;

  check_parent(parent_details.parent_email_login).then((queryRes) => {

    return new Promise((resolve, reject) => {

      if (queryRes[0].case === true) {
        resolve()

      } else {
        reject(new Error("user doesn't exist, please register"))
      }
    })
  }).then(() => {

      return check_parent_password(parent_details.parent_email_login)})
    .then((response) => {
console.log("response: ", response);
        const password = response[0].password;
        const name = response[0].first_name;
        const parent_id = response[0].id;
        console.log("id: ", parent_id);
        req.session.name = name;
        req.session.parent_id = parent_id;
        console.log(req.session);
        return bcryptjs.compare(parent_details.parent_password_login, password);


      }).then((bcryptResponse) => {
        return new Promise((resolve, reject) => {

        if (bcryptResponse) {
          req.session.loggedin = true;
          req.flash("name", req.session.name)
          res.redirect('/parent_profile');
        } else {
          reject(new Error("this password is incorrect, please try again"));
        }
      })
      }).catch((err) => {
        if(err.message === "this password is incorrect, please try again") {
          req.flash("error_msg", err.message);
          res.redirect("/parent_login_page");
        } else if (err.message === "user doesn't exist, please register") {
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
