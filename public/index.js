const parent_password = document.getElementById('parent-registration-password');
const parent_registration_submit = document.getElementById('parent-registration-submit');
const parent_password_input = document.getElementById('parent-registration-password')
const parent_strong_password_err = document.getElementById('strong_password_err');
const parent_registration_confirm_password = document.getElementById('parent-registration-confirm-password');
const confirm_password_err = document.getElementById('confirm_password_err')
const parent_registration_email = document.getElementById('parent-registration-email');
const parent_email_err = document.getElementById('parent_email_err');
const parent_phone_err = document.getElementById('parent_phone_err');
const parent_registration_phone = document.getElementById('parent-registration-phone');
const view_upcoming = document.getElementsByClassName('parent-profile__links')[0];
const scheduled_pickup = document.getElementById('scheduled_pickup');
const anchors = document.getElementById('anchors');
const postcode_err = document.getElementById('postcode_err');
const parent_registration_postcode = document.getElementById('parent-registration-postcode')

const confirmPassword = (password, confirm_password, display_error, button) => {
   return password.value !== confirm_password.value ? display_error.textContent = "The passwords do not match" :
   (button.disabled = true,
     display_error.textContent = "");
}

const strongPassword = (password, display_error, button) => {
  const regex = new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$');
  return !regex.test(password.value) ? display_error.textContent = "Passwords must contain one uppercase letter, one number, one special case letter(!@#$&*) and must be a minimum of 6 characters." :
  (button.disabled = true,
    display_error.textContent = "");
}

const emailValid = (email, display_error, button) => {
  const regex = new RegExp ('[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\\.[A-Za-z]');
  !regex.test(email.value) ? display_error.textContent = "Please enter a valid email." :
  (button.disabled = true,
    display_error.textContent = "");
}

const validPostcode = (postcode, display_error, button) => {
  const regex = new RegExp('([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})');
  return !regex.test(postcode.value.replace(/\s/g, '')) ? display_error.textContent = "Enter a valid UK postcode." :
  (button.disabled = true,
  display_error.textContent = "")
}

const checkPhone = (phone, display_error, button) => {
  const regex = new RegExp('^(\\[+44]\\s?7\\d{3}|\\(?07\\d{3}\\)?)\\s?\\d{3}\\s?\\d{3}$');
  return !regex.test(phone.value) ? display_error.textContent = "Please enter a valid UK phone number. i.e 07934562565" :
  (button.disabled = true,
   display_error.textContent = "");
}



const childYear = (child_year, button) => {
  child.length > 1 ? display_error.textContent = "Please enter a one digit year group" : button.disabled = true;
}



parent_password_input.addEventListener("keyup", ()=>{
  strongPassword(parent_password, parent_strong_password_err, parent_registration_submit)
});

parent_registration_confirm_password.addEventListener("keyup", ()=>{
  confirmPassword(parent_password_input, parent_registration_confirm_password, confirm_password_err, parent_registration_submit)
});

parent_registration_email.addEventListener("keyup", ()=>{
  emailValid(parent_registration_email, parent_email_err, parent_registration_submit)
})

parent_registration_postcode.addEventListener("keyup", ()=>{
  validPostcode(parent_registration_postcode, postcode_err, parent_registration_submit)
})

parent_registration_phone.addEventListener('keyup', ()=>{
  checkPhone(parent_registration_phone, parent_phone_err, parent_registration_submit)
})
