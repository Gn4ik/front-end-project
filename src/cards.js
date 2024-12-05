import { imagePopup, openModal } from './index.js';
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;
export function createCard(cardData) {

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener('click', function () {
        imagePopup.querySelector('.popup__image').src = cardImage.src;
        imagePopup.querySelector('.popup__caption').textContent = cardTitle.textContent;
        openModal(imagePopup);
    });

    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    deleteButton.addEventListener('click', function () {
        const cardToDelete = deleteButton.closest('.card');
        cardToDelete.remove();
    });

    return cardElement;
}

function renderCards() {
    const placesList = document.querySelector('.places__list');

    initialCards.forEach(cardData => {
        const card = createCard(cardData);
        placesList.append(card);
    });
}

renderCards();