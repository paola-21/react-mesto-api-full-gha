import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_img ${props.card && "popup_opened"}`}>
      <div className="popup__container-figure">
        <figure className="popup__figure">
          <img
            src={props.card ? props.card.link : ""}
            alt={props.card ? props.card.name : ""}
            className="popup__img"
          />
          <figcaption className="popup__img-title">
            {props.card ? props.card.name : ""}
          </figcaption>
        </figure>
        <button
          className="popup__close popup__close_type_img"
          type="reset"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
