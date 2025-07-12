const profileOpenBtn = document.querySelector(".profile__edit-btn");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = profileModal.querySelector(".modal__close-btn");

profileOpenBtn.addEventListener("click", function () {
  profileModal.setAttribute("style", "visibility: visible");
  //console.log("Edit button clicked");
});
profileCloseBtn.addEventListener("click", function () {
  profileModal.setAttribute("style", "visibility: hidden");
  //console.log("Edit button clicked");
});

const postOpenBtn = document.querySelector(".profile__plus-btn");
const postModal = document.querySelector("#new-post-modal");
const postCloseBtn = postModal.querySelector(".modal__close-btn");

postOpenBtn.addEventListener("click", function () {
  postModal.setAttribute("style", "visibility: visible");
});
postCloseBtn.addEventListener("click", function () {
  postModal.setAttribute("style", "visibility: hidden");
});
