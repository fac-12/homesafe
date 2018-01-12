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

const formatDate = (date) => {
  const splitDate = date.split('-')
  const reshuffle = splitDate[2] +"-"+ splitDate[1] + "-"+ splitDate[0];
  return reshuffle;
}


module.exports = {
  validateEmail,
  formatDate
}
