"use strict";


var userButtons = document.getElementsByClassName("user__buttons")[0];
var loginButton = document.getElementsByClassName("home__buttons__login")[0];
var homeBackButton = document.getElementsByClassName("user__buttons__back")[0];

loginButton.addEventListener("click", function () {
  userButtons.classList.add("showForm");
  loginButton.classList.add("hideForm");
});

homeBackButton.addEventListener("click", function () {
  userButtons.classList.remove("showForm");
  loginButton.classList.remove("hideForm");
});
