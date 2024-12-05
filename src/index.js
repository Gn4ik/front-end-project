import './css/pages/index.css';
import './cards.js';
import { createCard } from './cards.js';

//PopUp
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

export { imagePopup };
//Cards
const placesList = document.querySelector('.places__list');

//profileForm
const profileFormElement = profilePopup.querySelector('form[name="edit-profile"]');
const profileFormButton = profileFormElement.querySelector('[type="submit"]');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditCloseButton = profilePopup.querySelector('.popup__close');

//cardForm
const cardFormElement = cardPopup.querySelector('form[name="new-place"]');
const cardFormButton = cardPopup.querySelector('[type="submit"]');
const cardEditButton = document.querySelector('.profile__add-button');
const cardEditCloseButton = cardPopup.querySelector('.popup__close');

const imageClosePopupButton = imagePopup.querySelector('.popup__close');

function closeByEsc(evt) {
    if (evt.key === "Escape"){
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}
export function openModal(popup) {
    popup.classList.add('popup_is-opened');

    popup.addEventListener('mousedown', (evt) => {
        const clickedElement = evt.target;
        if (!clickedElement.closest('.popup__content')) {
            closeModal(popup);
        }

        if (clickedElement.classList.contains('popup__close')) {
            const popup = clickedElement.closest('.popup');
            closeModal(popup);
        }
    });
    document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEsc);
}
function fillProfileForm() {
    const name = document.querySelector('.profile__title').textContent;
    const description = document.querySelector('.profile__description').textContent;
    profileFormElement.querySelector('.popup__input_type_name').value = name;
    profileFormElement.querySelector('.popup__input_type_description').value = description;
    profileFormButton.disabled = false;
    validationProfileForm();
    openModal(profilePopup);
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;  // Элемент для вывода сообщения об ошибке
    errorElement.textContent = message;
    input.classList.add('popup__input_type_error');
}

function hideError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    input.classList.remove('popup__input_type_error');
}

function validateProfileName() {
    const profileFormElementName = profileFormElement.querySelector('.popup__input_type_name');
    if (profileFormElementName.value.length == 0) {
        showError(profileFormElementName, 'Вы пропустили это поле');
        return false;
    }
    if (profileFormElementName.value.length < 2 || profileFormElementName.value.length > 40) {
        showError(profileFormElementName, 'Имя должно быть от 2 до 40 символов');
        return false;
    }
    hideError(profileFormElementName);
    return true;
}

function validateProfileDescription() {
    const profileFormElementDescription = profileFormElement.querySelector('.popup__input_type_description');
    if (profileFormElementDescription.value.length == 0) {
        showError(profileFormElementDescription, 'Вы пропустили это поле');
        return false;
    }
    if (profileFormElementDescription.value.length < 2 || profileFormElementDescription.value.length > 200) {
        showError(profileFormElementDescription, 'Описание должно быть от 2 до 200 символов');
        return false;
    }
    hideError(profileFormElementDescription);
    return true;
}

function validationProfileForm() {
    const isNameValid = validateProfileName();
    const isDescriptionValid = validateProfileDescription();

    profileFormButton.disabled = !(isNameValid && isDescriptionValid);
}

function validationPlaceTitle() {
    const PlaceTitle = cardPopup.querySelector('.popup__input_type_card-name');
    if (PlaceTitle.value.length == 0) {
        showError(PlaceTitle, 'Вы пропустили это поле');
        return false;
    }
    if (PlaceTitle.value.length < 2 || PlaceTitle.value.length > 30) {
        showError(PlaceTitle, 'Название должно быть от 2 до 30 символов');
        return false;
    }
    hideError(PlaceTitle);
    return true;
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

function validationPlaceURL() {
    const PlaceUrl = cardPopup.querySelector('.popup__input_type_url');
    if (PlaceUrl.value.length == 0) {
        showError(PlaceUrl, 'Вы пропустили это поле');
        return false;
    }
    if (!isValidUrl(PlaceUrl.value)) {
        showError(PlaceUrl, 'Введите адрес сайта');
        return false;
    }
    hideError(PlaceUrl);
    return true;
}

function validationNewPlaceForm() {
    const isTitleValid = validationPlaceTitle();
    const isUrlValid = validationPlaceURL();

    cardFormButton.disabled = !(isTitleValid && isUrlValid);
}

profileFormElement.querySelectorAll('.popup__input').forEach(input => {
    input.addEventListener('input', validationProfileForm);
});

cardFormElement.querySelectorAll('.popup__input').forEach(input => {
    input.addEventListener('input', validationNewPlaceForm);
})

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    document.querySelector('.profile__title').textContent = profileFormElement.querySelector('.popup__input_type_name').value;
    document.querySelector('.profile__description').textContent = profileFormElement.querySelector('.popup__input_type_description').value;
    closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const CardName = cardFormElement.querySelector('.popup__input_type_card-name');
    const CardLink = cardFormElement.querySelector('.popup__input_type_url');
    const cardData = {
        name: CardName.value,
        link: CardLink.value
    }
    CardName.value = '';
    CardLink.value = '';
    const card = createCard(cardData);
    placesList.insertBefore(card, placesList.firstChild);
    closeModal(cardPopup);
}

profileEditButton.addEventListener('click', () => fillProfileForm());
profileEditCloseButton.addEventListener('click', () => closeModal(profilePopup));
profileFormElement.addEventListener('submit', handleProfileFormSubmit); 

cardEditButton.addEventListener('click', () => openModal(cardPopup));
cardEditCloseButton.addEventListener('click', () => closeModal(cardPopup));
cardFormElement.addEventListener('submit', handleCardFormSubmit);

imageClosePopupButton.addEventListener('click', () => closeModal(imagePopup));