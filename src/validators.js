const validator = require('validator')

const validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    const email_check = validator.isEmail(email);
    if (!email_check) {
      reject(new Error("Please make sure you have entered a valid email in both your email and your guardian's email."))
    } else {
      resolve(email)
    }
  })
}


module.exports = {
  validateEmail
}
