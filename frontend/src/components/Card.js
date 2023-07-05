import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card({
  card,
  onCardClick,
  onCardDelete,
  onCardLike,
  onCardDislike,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_aktive"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleCardLike() {
    isLiked ? onCardDislike(card) : onCardLike(card);
  }

  // function handleCardDislike () {
  //   onCardDislike(card);
  // }

  return (
    <li className="element">
      <img
        src={card.link}
        alt={card.name}
        className="element__foto"
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__text">{card.name}</h2>
        <div className="like__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleCardLike}
          ></button>
          <p className="element__like-text">{card.likes.length}</p>
        </div>
        {isOwn && (
          <button
            className="element__delete"
            type="submit"
            onClick={handleDeleteClick}
          ></button>
        )}
      </div>
    </li>
  );
}
