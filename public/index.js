

const userButtons = document.getElementsByClassName("user__buttons")[0];
const loginButton = document.getElementsByClassName("home__buttons__login")[0];
const homeBackButton = document.getElementsByClassName("user__buttons__back")[0];

loginButton.addEventListener("click", () => {
  userButtons.classList.add("showForm");
  loginButton.classList.add("hideForm");
})

homeBackButton.addEventListener("click", () => {
  userButtons.classList.remove("showForm");
  loginButton.classList.remove("hideForm");
})
