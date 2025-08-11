const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
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
    cardElement.remove();
  });

  return cardElement;
}

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
  resetValidation(
    profileFormEl,
    [profileNameInput, profileDescriptInput],
    settings
  );
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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitleEl.textContent = profileNameInput.value;
  profileSubtitleEl.textContent = profileDescriptInput.value;
  // Close the modal.
  closeModal(profileModal);
  profileFormEl.reset();
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
/*
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.modal_is-opened").forEach((modal) => {
      closeModal(modal);
    });
  }
});*/
function handleEscapeClose(event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal.modal_is-opened").forEach((modal) => {
      closeModal(modal);
    });
  }
}

// This is the New Function I created
function renderCard(data) {
  const cardElement = getCardElement(data);
  cardsList.prepend(cardElement);
}

profileFormEl.addEventListener("submit", handleProfileFormSubmit);
postFormEl.addEventListener("submit", handleAddCardSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    link: postLinkInput.value,
    name: postCaptionInput.value,
  };

  renderCard(inputValues);
  closeModal(postModal);
  postFormEl.reset();
}

initialCards.forEach(function (card) {
  const cardElement = getCardElement(card);
  cardsList.append(cardElement);
});
