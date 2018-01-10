"use strict";

var sayHello = function sayHello() {
  console.log("say hello");
};

sayHello();

var sayhi = function sayhi() {
  console.log("say hi to me now!");
};
sayhi();

var userButtons = document.getElementsByClassName("user__buttons")[0];
var loginButton = document.getElementsByClassName("home__buttons__login")[0];
console.log(userButtons);
console.log(loginButton);

loginButton.addEventListener("click", function () {
  console.log("button has been clicked");
  userButtons.classList.add("showForm");
  loginButton.classList.add("hideForm");
});
