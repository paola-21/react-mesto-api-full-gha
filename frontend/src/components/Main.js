import React from "react";
import editButton from "../images/editButton.svg";
import { api } from "../utils/Api.js";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
//import { useContext } from 'react';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardDelete,
  onCardLike,
  onCardDislike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <div className="profile__cover">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар"
          />
          <button className="profile__button-container" onClick={onEditAvatar}>
            <img
              className="profile__button-avatar"
              src={editButton}
              alt="кнопка"
            />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__header">{currentUser.name}</h1>
          <button
            className="edit-button"
            type="button"
            aria-label="редактировать"
            onClick={onEditProfile}
          ></button>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button
          className="add-button"
          type="button"
          aria-label="добавить"
          onClick={onAddPlace}
        ></button>
      </section>

      <ul className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
            onCardDislike={onCardDislike}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
