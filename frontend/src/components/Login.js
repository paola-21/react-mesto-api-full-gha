import React from "react";

function Login({ onLogin }) {
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
    onLogin(email, password);
  };

  return (
    <>
      <div className="login__container">
        <h2 className="login__header"> Вход</h2>
        <form className="" onSubmit={handleSubmit}>
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
          />
          <span className="form__input-error"></span>
          <button className="login__input-button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
