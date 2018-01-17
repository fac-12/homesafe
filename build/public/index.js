'use strict';

var sayHello = function sayHello() {
  console.log("hello!");
};
sayHello();

var parent_password = document.getElementById('parent-registration-password');
var parent_registration_submit = document.getElementById('parent-registration-submit');
// const parent_password_input = document.getElementById('parent-registration-password')
var parent_strong_password_err = document.getElementById('strong_password_err');
var parent_registration_confirm_password = document.getElementById('parent-registration-confirm-password');
var confirm_password_err = document.getElementById('confirm_password_err');
var parent_registration_email = document.getElementById('parent-registration-email');
var parent_email_err = document.getElementById('parent_email_err');
var parent_phone_err = document.getElementById('parent_phone_err');
var parent_registration_phone = document.getElementById('parent-registration-phone');

var confirmPassword = function confirmPassword(password, confirm_password, display_error, button) {
  return password.value !== confirm_password.value ? display_error.textContent = "The passwords do not match" : (button.disabled = false, display_error.textContent = "");
};

var strongPassword = function strongPassword(password, display_error, button) {
  var regex = new RegExp('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$');
  return !regex.test(password.value) ? display_error.textContent = "Passwords must contain one uppercase letter, one number, one special case letter(!@#$&*) and must be a minimum of 6 characters." : (button.disabled = false, display_error.textContent = "");
};

var emailValid = function emailValid(email, display_error, button) {
  // const regex = new RegExp ('^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
  var regex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');
  !regex.test(email.value) ? display_error.textContent = "Please enter a valid email." : (button.disabled = false, display_error.textContent = "");
};

var childYear = function childYear(child_year, button) {
  child.length > 1 ? display_error.textContent = "Please enter a one digit year group" : button.disabled = false;
};

var checkPhone = function checkPhone(phone, display_error, button) {
  var regex = new RegExp();
  return !regex.test(phone.value) ? display_error.textContent = "Please enter a valid UK phone number" : (button.disabled = false, display_error.textContent = "");
};

parent_password.addEventListener("keyup", function () {
  strongPassword(parent_password, parent_strong_password_err, parent_registration_submit);
});

parent_registration_confirm_password.addEventListener("keyup", function () {
  confirmPassword(parent_password, parent_registration_confirm_password, confirm_password_err, parent_registration_submit);
});

parent_registration_email.addEventListener("keyup", function () {
  emailValid(parent_registration_email, parent_email_err, parent_registration_submit);
});

parent_registration_phone.addEventListener('keyup', function () {
  checkPhone(parent_registration_phone, parent_phone_err, parent_registration_submit);
});

var school_password = document.getElementById('school-registration-password');
var school_registration_submit = document.getElementById('school-registration-submit');
var school_registration_email = document.getElementById('school-registration-email');
var school_registration_confirm_password = document.getElementById('school-registration-confirm-password');
school_password.addEventListener("keyup", function () {
  strongPassword(school_password, strong_password_err, school_registration_submit);
});
school_registration_confirm_password.addEventListener("keyup", function () {
  confirmPassword(school_password, school_registration_confirm_password, confirm_password_err, school_registration_submit);
});
school_registration_email.addEventListener("keyup", function () {
  emailValid(school_registration_email, email_err, school_registration_submit);
});
var email_err = document.getElementById('email_err');