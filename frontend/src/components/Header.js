import headerLogo from "../images/header__logo.svg";
import { Link } from "react-router-dom";

function Header({ email, headerTitle, headerLink, signOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <h2 className="header__email">{email}</h2>
      <h2 className="header__title" onClick={signOut}>
        <Link className="login__link" to={headerLink}>
          {headerTitle}
        </Link>
      </h2>
    </header>
  );
}

export default Header;
