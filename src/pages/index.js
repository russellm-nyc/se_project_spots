import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../util/Api.js";
import { data } from "autoprefixer";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "032da0f5-4f73-4618-9e72-7c7464e6265c", // Replaced with my token
    "Content-Type": "application/json",
  },
});

api
  .getAppInfo()
  .then(([cards, userData]) => {
    console.log("User data:", userData);
    console.log("Cards:", cards);
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

//PROFILE elements
const profileOpenBtn = document.querySelector(".profile__edit-btn");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = profileModal.querySelector(".modal__close");
const profileFormEl = profileModal.querySelector(".modal__form");

const profileTitleEl = document.querySelector(".profile__title");
const profileSubtitleEl = document.querySelector(".profile__subtitle");
const profileNameInput = profileModal.querySelector("#profile-name-input");
const profileDescriptInput = profileModal.querySelector(
  "#profile-description-input"
);

//POST elements
const postOpenBtn = document.querySelector(".profile__plus-btn");
const postModal = document.querySelector("#new-post-modal");
const postCloseBtn = postModal.querySelector(".modal__close");
const postFormEl = postModal.querySelector(".modal__form");
const postSubmitBtn = postModal.querySelector(".modal__submit-btn");
const postLinkInput = postModal.querySelector("#post-link-input");
const postCaptionInput = postModal.querySelector("#post-caption-input");

//PREVIEW elements
const previewModal = document.querySelector("#preview-modal");
const previewClose = previewModal.querySelector(".modal__close_type_preview");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

//AVATAR elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarOpenBtn = document.querySelector(".profile__avatar-btn");
const avatarFormEl = avatarModal.querySelector(".modal__form");
const avatarCloseBtn = avatarModal.querySelector(".modal__close");
const avatarSubmitBtn = avatarModal.querySelector(".modal__submit-btn");
const avatarLinkInput = avatarModal.querySelector("#profile-avatar-input");

//DELETE elements
const deleteModal = document.querySelector("#delete-modal");
const deleteCloseBtn = deleteModal.querySelector(".modal__close_type_preview");
const deleteCancelBtn = deleteModal.querySelector(".modal__cancel-btn");
const deleteBtn = deleteModal.querySelector(".modal__delete-btn");
const deleteForm = deleteModal.querySelector(".modal__form");

let selectedCard;
let selectedCardId;

// CLONE Card Template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// FUNCTIONS
function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImgEL = cardElement.querySelector(".card__image");

  cardTitleEl.textContent = data.name;
  cardImgEL.src = data.link;
  cardImgEL.alt = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  cardImgEL.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  const cardTrashBtnEl = cardElement.querySelector(".card__trash-btn");
  cardTrashBtnEl.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  return cardElement;
}

// deleteCard Submit Handler
deleteForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  if (!selectedCard || !selectedCardId) return;

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
      selectedCard = null;
      selectedCardId = null;
    })
    .catch((err) => {
      console.error("Failed to delete card:", err);
    });
});

// MODAL OPEN Function
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeClose);
}
// MODAL CLOSE Function
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeClose);
}

// Open PROFILE Modal - 1
profileOpenBtn.addEventListener("click", function () {
  openModal(profileModal);
  const profileInputs = Array.from(
    profileFormEl.querySelectorAll(settings.inputSelector)
  );
  resetValidation(profileFormEl, profileInputs, settings);

  profileNameInput.value = profileTitleEl.textContent;
  profileDescriptInput.value = profileSubtitleEl.textContent;
});

// Open POST Modal - 2
postOpenBtn.addEventListener("click", function () {
  openModal(postModal);
  resetValidation(postFormEl, [postLinkInput, postCaptionInput], settings);
  //Reset form values
  postFormEl.reset();
  // Force the submit button to be disabled initially
  postSubmitBtn.disabled = true;
  postSubmitBtn.classList.add("modal__button_inactive");
});

// Open AVATAR Modal - 4
avatarOpenBtn.addEventListener("click", function () {
  openModal(avatarModal);
  const avatarInputs = Array.from(
    avatarFormEl.querySelectorAll(settings.inputSelector)
  );
  resetValidation(avatarFormEl, avatarInputs, settings);
  //Reset form values
  avatarFormEl.reset();
  // Force the submit button to be disabled initially
  avatarSubmitBtn.disabled = true;
  avatarSubmitBtn.classList.add("modal__button_inactive");
});

// Close PROFILE Modal - 1
profileCloseBtn.addEventListener("click", function () {
  closeModal(profileModal);
});
// Close POST Modal - 2
postCloseBtn.addEventListener("click", function () {
  closeModal(postModal);
});
// Close PREVIEW Modal - 3
previewClose.addEventListener("click", function () {
  closeModal(previewModal);
});
// Close AVATAR Modal - 4
avatarCloseBtn.addEventListener("click", function () {
  closeModal(avatarModal);
});
// Close DELETE Modal - 5
deleteCloseBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});
deleteCancelBtn.addEventListener("click", function () {
  closeModal(deleteModal);
});

// editUserInfo Submit Handler
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: profileNameInput.value,
      about: profileDescriptInput.value,
    })
    .then((data) => {
      profileTitleEl.textContent = data.name;
      profileSubtitleEl.textContent = data.about;
      closeModal(profileModal);
    })
    .catch(console.error);

  // profileFormEl.reset();
}

// Update avatar Submit Handler
function handleUpdateAvatarSubmit(evt) {
  console.log("Avatar form submitted!");
  evt.preventDefault();
  api
    .updateAvatar({
      avatar: avatarLinkInput.value,
    })
    .then((data) => {
      document.querySelector(".profile__image").src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error);
}

// createCard Subit Handler
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    link: postLinkInput.value,
    name: postCaptionInput.value,
  };

  api
    .createCard(inputValues)
    .then((newCard) => {
      renderCard(newCard);
      closeModal(postModal);
      postFormEl.reset();
    })
    .catch(console.error);
}

// Close ALL modals on overlay click
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

// Close ALL modals on ESC click
function handleEscapeClose(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    closeModal(openedModal);
  }
}

// This is the New Function I created
function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsList.prepend(cardElement);
}

profileFormEl.addEventListener("submit", handleProfileFormSubmit);
avatarFormEl.addEventListener("submit", handleUpdateAvatarSubmit);
postFormEl.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);
