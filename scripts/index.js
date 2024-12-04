//PopUp
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

//Cards
const placesList = document.querySelector('.places__list');

//profileForm
const profileFormElement = profilePopup.querySelector('form[name="edit-profile"]');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditCloseButton = profilePopup.querySelector('.popup__close');

//cardForm
const cardFormElement = cardPopup.querySelector('form[name="new-place"]');
const cardEditButton = document.querySelector('.profile__add-button');
const cardEditCloseButton = cardPopup.querySelector('.popup__close');

const imageClosePopupButton = imagePopup.querySelector('.popup__close');
function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}
function fillProfileForm() {
    const name = document.querySelector('.profile__title').textContent;
    const description = document.querySelector('.profile__description').textContent;
    profileFormElement.querySelector('.popup__input_type_name').value = name;
    profileFormElement.querySelector('.popup__input_type_description').value = description;
    openModal(profilePopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    document.querySelector('.profile__title').textContent = profileFormElement.querySelector('.popup__input_type_name').value;
    document.querySelector('.profile__description').textContent = profileFormElement.querySelector('.popup__input_type_description').value;
    closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardData = {
        name: cardFormElement.querySelector('.popup__input_type_card-name').value,
        link: cardFormElement.querySelector('.popup__input_type_url').value
    }

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