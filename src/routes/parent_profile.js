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
    }).then(() => {

      return check_parent_password(parent_details.parent_email_login)})
    .then((response) => {
      const password = response[0].password;
      bcrypt.compare(parent_details.parent_password_login,password)

      // return new Promise((resolve,reject) => {
      //   bcrypt.compare(parent_details.parent_password_login)
      // })
    })



})
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
