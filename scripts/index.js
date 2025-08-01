const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
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
const profileOpenBtn = document.querySelector(".profile__edit-btn");
const profileModal = document.querySelector("#edit-profile-modal");
const profileCloseBtn = profileModal.querySelector(".modal__close");
const profileFormEl = profileModal.querySelector(".modal__form");

const profileTitleEl = document.querySelector(".profile__title");
const profileSubtitleEl = document.querySelector(".profile__subtitle");
const profileNameInput = profileModal.querySelector("#profile-name-input");
const profileDescriptionInput = profileModal.querySelector(
  "#profile-description-input"
);
// Clone Card Template
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
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
    cardElement = null;
  });

  return cardElement;
}

//
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

profileOpenBtn.addEventListener("click", function () {
  openModal(profileModal);
  profileNameInput.value = profileTitleEl.textContent;
  profileDescriptionInput.value = profileSubtitleEl.textContent;
});
profileCloseBtn.addEventListener("click", function () {
  closeModal(profileModal);
});

const previewModal = document.querySelector("#preview-modal");
const previewClose = previewModal.querySelector(
  ".modal__close, .modal__close_type_preview"
);
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

previewClose.addEventListener("click", function () {
  closeModal(previewModal);
});

const postOpenBtn = document.querySelector(".profile__plus-btn");
const postModal = document.querySelector("#new-post-modal");
const postCloseBtn = postModal.querySelector(".modal__close");
const postFormEl = postModal.querySelector(".modal__form");

const postLinkInput = postModal.querySelector("#post-link-input");
const postCaptionInput = postModal.querySelector("#post-caption-input");

postOpenBtn.addEventListener("click", function () {
  openModal(postModal);
});

postCloseBtn.addEventListener("click", function () {
  closeModal(postModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileTitleEl.textContent = profileNameInput.value;
  profileSubtitleEl.textContent = profileDescriptionInput.value;
  // Close the modal.
  closeModal(profileModal);
  profileFormEl.reset();
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
  renderCard(card);
});
