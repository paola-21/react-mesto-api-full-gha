import React, { useState } from "react";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
//import { Link, useNavigate } from 'react-router-dom';
import * as apiAuth from "../utils/apiAuth.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import imageRegister from "../images/Register.png";
import imageNoRegister from "../images/NoRegister.png";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setСurrentUser] = React.useState({});
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [isInfoTooltipError, setIsInfoTooltipError] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: "" });

  const navigate = useNavigate();

  function getCurrentUser() {
    api
      .getCurrentUser()
      .then((profile) => {
        setСurrentUser(profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //загрузка профиля и аватара с сервера
  React.useEffect(() => {
    if (loggedIn) {
      getCurrentUser();
    }
  }, [loggedIn]);

  //загрузка карточек с сервера

  function getCard() {
    api
      .getCard()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    if (loggedIn) {
      getCard();
    }
  }, [loggedIn]);

  //загрузка и обновление данные профиля
  function handleUpdateUser(profile) {
    api
      .editProfile(profile)
      .then((profile) => {
        setСurrentUser(profile);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //загрузка и обновление данных аватара
  function handleUpdateAvatar(profile) {
    api
      .editAvatar(profile)
      .then((profile) => {
        setСurrentUser(profile);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateNewCard(newCard) {
    api
      .createCardApi(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //лайк карточки через проброс на сервер
  function handleCardLike(card) {
    api
      .clickLike(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //дизлайк карточки
  function handleCardDislike(card) {
    api
      .deleteLike(card._id)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //открытие картинки на весь экран
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  //открытие попапа аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  //открытие попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  //открытие попапа добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltip() {
    setIsInfoTooltip(true);
  }

  function handleInfoTooltipError() {
    setIsInfoTooltipError(true);
  }

  //закрытие всех попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltip(false);
    setIsInfoTooltipError(false);
    setSelectedCard(null);
  }

  //регистрация
  function handleRegister(email, password) {
    apiAuth
      .register(email, password)
      .then(() => {
        handleInfoTooltip();
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        handleInfoTooltipError();
        console.log(err);
      });
  }

  function handleAuthorize(email, password) {
    apiAuth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          handleLogin({ email });
          navigate("/mesto-react", { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //проверка токена
  function handleTokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .checkToken(token)
        .then((user) => {
          handleLogin(user.data);
          navigate("/mesto-react", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  const handleLogin = ({ email }) => {
    setLoggedIn(true);
    setUserData({ email });
  };

  React.useEffect(() => {
    handleTokenCheck();
  }, []);

  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-up", { replace: true });
  }

  function signIn() {
    navigate("/sign-in", { replace: true });
  }

  function signUp() {
    navigate("/sign-up", { replace: true });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/mesto-react" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/sign-up"
              element={
                <>
                  <Header
                    email={""}
                    headerTitle={"Войти"}
                    headerLink={"/sign-in"}
                    signOut={signIn}
                  />
                  <Register onRegister={handleRegister} />
                </>
              }
            />

            <Route
              path="/sign-in"
              element={
                <>
                  <Header
                    email={""}
                    headerTitle={"Регистрация"}
                    headerLink={"/sign-up"}
                    signOut={signUp}
                  />
                  <Login onLogin={handleAuthorize} />
                </>
              }
            />

            <Route
              path="/mesto-react"
              element={
                <>
                  <ProtectedRoute
                    element={Header}
                    loggedIn={loggedIn}
                    userData={userData}
                    email={JSON.stringify(userData.email)}
                    headerTitle={"Выйти"}
                    headerLink={""}
                    signOut={signOut}
                  />

                  <ProtectedRoute
                    element={Main}
                    loggedIn={loggedIn}
                    userData={userData}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    onCardDislike={handleCardDislike}
                  />
                </>
              }
            />
          </Routes>
          <Footer />
        </div>

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />

        <InfoTooltip
          name="register"
          title="Вы успешно зарегистрировались!"
          image={imageRegister}
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          name="error"
          title="Что-то пошло не так! Попробуйте ещё раз."
          image={imageNoRegister}
          isOpen={isInfoTooltipError}
          onClose={closeAllPopups}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateNewCard={handleUpdateNewCard}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
