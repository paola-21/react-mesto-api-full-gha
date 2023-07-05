import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <h2 className="popup__header">{props.header}</h2>
        <form
          className={`form form_type_${props.name}`}
          name={props.attributeName}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="form__input-button" type="submit">
            {props.buttonTitle}
          </button>
        </form>
        <button
          className={`popup__close popup__close_type_${props.name}`}
          type="reset"
          aria-label="закрыть"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
