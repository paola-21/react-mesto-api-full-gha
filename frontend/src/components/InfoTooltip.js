import React from "react";

function InfoTooltip({ name, title, image, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="infoTooltip__container">
        <img
          className="infoTooltip__image"
          src={image}
          alt="значек регистрации"
        />
        <h2 className="infoTooltip__title">{title}</h2>
        <button
          className={`popup__close popup__close_type_${name}`}
          type="reset"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
