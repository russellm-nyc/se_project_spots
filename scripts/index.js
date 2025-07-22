const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];
const profileOpenBtn = document.querySelector(".profile__edit-btn");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = profileModal.querySelector(".modal__close-btn");
const profileFormEl = profileModal.querySelector(".modal__form");

const profileTitleEl = document.querySelector(".profile__title");
const profileSubtitleEl = document.querySelector(".profile__subtitle");
const profileNameInput = profileModal.querySelector("#profile-name-input");
const profileDescriptionInput = profileModal.querySelector(
  "#profile-description-input"
);

profileOpenBtn.addEventListener("click", function () {
  profileModal.classList.add("modal_is-opened");
  profileNameInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileSubtitleEl.textContent;
});
profileCloseBtn.addEventListener("click", function () {
  profileModal.classList.remove("modal_is-opened");
});

const postOpenBtn = document.querySelector(".profile__plus-btn");
const postModal = document.querySelector("#new-post-modal");
const postCloseBtn = postModal.querySelector(".modal__close-btn");
const postFormEl = postModal.querySelector(".modal__form");

const postLinkInput = postModal.querySelector("#post-link-input");
const postCaptionInput = postModal.querySelector("#post-caption-input");

postOpenBtn.addEventListener("click", function () {
  postModal.classList.add("modal_is-opened");
  postLinkInput.value = "";
  postCaptionInput.value = "";
});

postCloseBtn.addEventListener("click", function () {
  postModal.classList.remove("modal_is-opened");
});

initialCards.forEach(function (card) {
  console.log(card.name);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitleEl.textContent = profileNameInput.value;
  profileSubtitleEl.textContent = profileDescriptionInput.value;
  // Close the modal.
  profileModal.classList.remove("modal_is-opened");
}

// Set the submit listener.
profileFormEl.addEventListener("submit", handleProfileFormSubmit);
postFormEl.addEventListener("submit", handleAddCardSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  console.log(postLinkInput.value);
  console.log(postCaptionInput.value);
  // Close the modal.
  postModal.classList.remove("modal_is-opened");
}
