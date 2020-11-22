import React from 'react';
import Header from './Header.js';
import { api } from './../utils/api.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: ''
  });

  //изначальная инфа и фотки
  React.useEffect(() => {
    Promise.all([api.getCardList(), api.getUserInfo()])
      .then(([cards, user]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(err => console.log(err))
  }, []);

  //редактирование профия попап
  const handleEditProfileClick = function () {
    setEditProfilePopupOpen(true);
  };

  //добавить фотку попап
  const handleAddPlaceClick = function () {
    setAddPlacePopupOpen(true);
  };

  //открытие фотки попап
  const handleCardClick = function (card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  //редактирование аватара попап
  const handleEditAvatarClick = function () {
    setEditAvatarPopupOpen(true);
  };

  //постановка лайка или дизлайка
  const handleCardLike = function (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards)
      })
      .catch(err => console.log(err))
  };

  //обновить инфу в профиле
  const handleUpdateUser = function ({ name, about }) {
    api
      .setUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups()
      })
      .catch((error) => console.error(error))
  };

  // обновление аватара
  const handleUpdateAvatar = function (avatar) {
    api.setUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  };

  // добавление новой карточки
  const handleAddPlaceSubmit = function ({ name, link, reset }) {
    api
      .loadNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        reset();
      });
  };
  // удаление своей карточки
  const handleCardDelete = function (card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== card._id
        );
        setCards(newCards);
      })
      .catch((error) => console.error(error))
  };

  const closeAllPopups = function () {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  };


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onDeleteClick={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
