import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;

    onRegister(email, password);
  };

  return (
    <div className="login__container">
      <h2 className="login__header">Регистрация</h2>
      <form className="form__login" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          onChange={handleChange}
          value={formValue.email}
          required
        />
        <span className="form__input-error"></span>

        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          name="password"
          autoComplete="new-password"
          onChange={handleChange}
          value={formValue.password}
          required
          minLength="8"
          maxLength="16"
        />
        <span className="form__input-error"></span>
        <button className="login__input-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <h2 className="login__text">
        Уже зарегистрированы?{" "}
        <Link className="login__link" to={"/sign-in"}>
          Войти
        </Link>
      </h2>
    </div>
  );
}

export default Register;
