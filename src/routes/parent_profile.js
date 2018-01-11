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

        const password = response[0].password;
        const name = response[0].first_name;
        req.session.name = name;
        console.log(name);
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
          throw err;
        }
      })



      // return new Promise((resolve,reject) => {
      //   bcrypt.compare(parent_details.parent_password_login)
      // })

}



//   }).then(()=>{
//     return new Promise((resolve, reject)=>{
//       bcryptjs.hash(parent_details.password, 10, (err, bcryptres)=>{
//         if(err){
//           reject(new Error("bcrypt error"))
//         } else{
//           resolve(bcryptres)
//         }
//       })
//     })
//   }).then((bcryptres)=>{
//     parent_details.password = bcryptres;
//   }).then(()=>{
//     return add_parent(parent_details.first_name, parent_details.last_name, parent_details.email, parent_details.password, parent_details.address, parent_details.postcode, parent_details.phone)
//   }).then(()=>{
//     res.redirect('/parent_profile')
//   })
// }
