import React from 'react';
import { api } from './../utils/api.js';
import Card from './Card.js';
import avatar from './../images/avatarka.png';
import pen from './../images/pen.png';

function Main(props) {
    const [userName, setUserName] = React.useState('Александр Смагин');
    const [userDescription, setUserDescription] = React.useState('начинающий разработчик');
    const [userAvatar, setUserAvatar] = React.useState(avatar);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([
            api.loadingUserInfo(),
            api.loadingCards()
        ])
            .then(([profile, places]) => {
                setUserAvatar(profile.avatar);
                setUserName(profile.name);
                setUserDescription(profile.about);
                setCards(places);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    return (
        <>
            <section className="profile">
                <img className="profile__avatar" src={userAvatar} alt="аватар" />
                <img
                    className="profile__change"
                    src={pen}
                    alt="ручка"
                    onClick={props.onEditAvatar} />
                <div className="profile-info">
                    <div className="profile__conteiner">
                        <h1 className="profile-info__title">{userName}</h1>
                        <button
                            aria-label="редактировать"
                            className="profile-info__edit-button"
                            type="button"
                            onClick={props.onEditProfile}></button>
                    </div>

                    <p className="profile-info__text">{userDescription}</p>
                </div>
                <button
                    aria-label="добавить"
                    className="profile__add-button"
                    type="button"
                    onClick={props.onAddPlace}></button>

            </section>
            <section className="elements">
                {cards.map((card, index) => (
                    <div className="element" key={card._id}>
                        <Card element={card} onImageClick={props.onCardClick} />
                    </div>
                ))}
            </section>
        </>
    )
}

export default Main;