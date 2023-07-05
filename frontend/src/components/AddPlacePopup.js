import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onUpdateNewCard }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateNewCard({
      name: cardName,
      link: cardLink,
    });
  }

  React.useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="new-card"
      header="Новое место"
      buttonTitle="Создать"
      attributeName="submit-new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="name-input"
        className="form__input form__input_text_name"
        type="text"
        placeholder="Название"
        name="name"
        minLength="2"
        maxLength="30"
        required
        onChange={handleChangeCardName}
        value={cardName}
      />
      <span className="name-input-error form__input-error"></span>
      <input
        id="link-input"
        className="form__input form__input_text_link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        onChange={handleChangeCardLink}
        value={cardLink}
      />
      <span className="link-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
