import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      header="Редактировать профиль"
      buttonTitle="Сохранить"
      attributeName="submit"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="header-input"
        className="form__input form__input_text_header"
        type="text"
        placeholder="Имя"
        name="name"
        required
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="header-input-error form__input-error"></span>
      <input
        id="text-input"
        className="form__input form__input_text_text"
        type="text"
        placeholder="Вид деятельности"
        name="about"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="text-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
