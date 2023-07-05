import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function DeleteCardPopup({ isOpen, onClose }) {
  //сделать позже!!!!

  return (
    <PopupWithForm
      name="delete-card"
      header="Вы уверены?"
      buttonTitle="Да"
      attributeName="submit-delete-card"
      isOpen={isOpen}
      onClose={onClose}
      //onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default DeleteCardPopup;
