const add_parent = require("../queries/add_parent");
// const check_parent = require("check_parent");
const bcryptjs = require('bcryptjs');
const check_parent = require('../queries/check_parent');
const {validateEmail} = require('../validators')


exports.post = (req, res) => {
  const parent_details = req.body;
  check_parent(parent_details.email).then((queryRes) => {
    return new Promise((resolve, reject) => {
      if (queryRes[0].case === true) {
        reject(new Error("user already exists, please login"))

      } else {
        resolve()
      }
    })
  }).then(()=>{
    return validateEmail(parent_details.email)
  }).then((email)=>{
    parent_details.email = email;
  }).then(()=>{
    return new Promise((resolve, reject)=>{
      bcryptjs.hash(parent_details.password, 10, (err, bcryptres)=>{
        if(err){
          reject(new Error("bcrypt error"))
        } else{
          resolve(bcryptres)
        }
      })
    })
  }).then((bcryptres)=>{
    parent_details.password = bcryptres;
  }).then(()=>{
    return add_parent(parent_details.first_name, parent_details.last_name, parent_details.email, parent_details.password, parent_details.address, parent_details.postcode, parent_details.phone)
  }).then(()=>{
    res.redirect('/parent_profile')
  })
}
