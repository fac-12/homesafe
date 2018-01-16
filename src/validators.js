const validator = require('validator')

const validateEmail = (email) => {
  return new Promise((resolve, reject) => {
    const email_check = validator.isEmail(email);
    if (!email_check) {
      reject(new Error("Please make sure you have entered a valid email."))
    } else {
      resolve(email)
    }
  })
}

const make_names_array = (obj, which_names) => {
  var arrayObj = obj.reduce(function(acc, el){
    return acc.concat(el[which_names])
  }, [])
  return arrayObj
}

const unique_names = (obj, which_names) => {
  const all_names = make_names_array(obj, which_names)
  return all_names.filter((v, i, a) => a.indexOf(v) === i);
}

const today_date = () => {

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  let yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  }
  if(mm<10) {
      mm = '0'+mm
  }
  return yyyy + '-' + mm + '-' + dd;
};

module.exports = {
  validateEmail,
  unique_names,
  today_date
}
