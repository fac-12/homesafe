"use strict";


var userButtons = document.getElementsByClassName("user__buttons")[0];
var loginButton = document.getElementsByClassName("home__buttons__login")[0];
console.log(userButtons);
console.log(loginButton);

loginButton.addEventListener("click", function () {
  userButtons.classList.add("showForm");
  loginButton.classList.add("hideForm");
});
