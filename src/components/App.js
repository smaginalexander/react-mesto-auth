import React from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleEditProfileClick = function () {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = function () {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = function () {
    setEditAvatarPopupOpen(true);
  };

  const closeAllPopups = function () {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  };

  const handleCardClick = function (card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  return (
    // <>
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title={'Редактировать профиль'}
        name={'profile'}
        children={
          <>
            <input
              id="name"
              className="popup__input"
              type="text"
              required
              placeholder="Введите имя"
              name="userName"
              minLength={"2"}
              maxLength={"40"} />
            <input
              id="job"
              className="popup__input"
              type="text"
              required
              placeholder="укажите работу"
              name="userJob"
              minLength={"2"}
              maxLength={"200"} />
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        textOnButton={'Сохранить'}
      />
      <PopupWithForm
        title={'Новое место'}
        name={'add-card'}
        children={
          <>
            <input
              id="name-card"
              className="popup__input"
              type="text"
              required
              placeholder="Название"
              name="name"
              minLength={"1"}
              maxLength={"30"} />
            <input
              id="link-card"
              className="popup__input"
              type="url"
              required
              placeholder="Ссылка на картинку"
              name="link" />
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        textOnButton={'Создать'}
      />
      <PopupWithForm
        title={'Обновить аватар'}
        name={'update-avatar'}
        children={
          <input
            id="newName"
            className="popup__input"
            type="url"
            placeholder="ссылка на аватар"
            name="avatar"></input>
        }
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        textOnButton={'Сохранить'}
      />
      <PopupWithForm
        title={'Вы уверены'}
        name={'confirm'}
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        textOnButton={'Да'}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
    </div>
  );
}

export default App;
