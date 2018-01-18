'use strict';

var sayHello = function sayHello() {
  console.log("hello!");
};
sayHello();

var parent_password = document.getElementById('parent-registration-password');
var parent_registration_submit = document.getElementById('parent-registration-submit');
var parent_password_input = document.getElementById('parent-registration-password');
var parent_strong_password_err = document.getElementById('strong_password_err');
var parent_registration_confirm_password = document.getElementById('parent-registration-confirm-password');
var confirm_password_err = document.getElementById('confirm_password_err');
var parent_registration_email = document.getElementById('parent-registration-email');
var parent_email_err = document.getElementById('parent_email_err');
var parent_phone_err = document.getElementById('parent_phone_err');
var parent_registration_phone = document.getElementById('parent-registration-phone');
var view_upcoming = document.getElementsByClassName('parent-profile__links')[0];
var scheduled_pickup = document.getElementById('scheduled_pickup');
var anchors = document.getElementById('anchors');

// const confirmPassword = (password, confirm_password, display_error, button) => {
//    return password.value !== confirm_password.value ? display_error.textContent = "The passwords do not match" :
//    (button.disabled = false,
//      display_error.textContent = "");
// }
//
// const strongPassword = (password, display_error, button) => {
//   const regex = new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$');
//   return !regex.test(password.value) ? display_error.textContent = "Passwords must contain one uppercase letter, one number, one special case letter(!@#$&*) and must be a minimum of 6 characters." :
//   (button.disabled = false,
//     display_error.textContent = "");
// }
//
// const emailValid = (email, display_error, button) => {
//   const regex = new RegExp ('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
//   !regex.test(email.value) ? display_error.textContent = "Please enter a valid email." : button.disabled = false;
// }
//
// const childYear = (child_year, button) => {
//   child.length > 1 ? display_error.textContent = "Please enter a one digit year group" : button.disabled = false;
// }
//
// const checkPhone = (phone, display_error, button) => {
//   const regex = new RegExp ();
//   return !regex.test(phone.value) ? display_error.textContent = "Please enter a valid UK phone number" :
//   (button.disabled = false,
//     display_error.textContent = "");
// }
//
// parent_password_input.addEventListener("keyup", ()=>{
//   strongPassword(parent_password, parent_strong_password_err, parent_registration_submit)
// });
//
// parent_registration_confirm_password.addEventListener("keyup", ()=>{
//   confirmPassword(parent_password_input, parent_registration_confirm_password, confirm_password_err, parent_registration_submit)
// });
//
// parent_registration_email.addEventListener("keyup", ()=>{
//   emailValid(parent_registration_email, parent_email_err, parent_registration_submit)
// })
//
// parent_registration_phone.addEventListener('keyup', ()=>{
//   checkPhone(parent_registration_phone, parent_phone_err, parent_registration_submit)
// })