import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: input.current.value,
    });
  }

  React.useEffect(() => {
    input.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar-form"
      header="Обновить аватар"
      buttonTitle="Да"
      attributeName="submit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar-input"
        className="form__input form__input_text_avatar"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar"
        required
        ref={input}
      />
      <span className="avatar-input-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
