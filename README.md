# Приложение Мesto
Приложение, позволяющее пользователю редактировать профиль и аватар, добавять новые фотографии, удалять свои фотографии, лайкать и дизлайкать фотографии пользователей.

## Функционал

* Адаптивный интерфейс (в т. ч. новых компонентов и элементов);
* Регистрация и авторизация пользователей;
* Редактирование данных пользователя;
* Обновление аватара;
* Добавление новой карточки;
* Добавление и снятие лайка (включая счетчик лайков);
* Удаление карточки с модальным окном подтверждения действия;
* Модальное окно успешной/неудачной регистрации на сайте;
* Модальное окно с увеличенной фотографией карточки;
* Открытие и закрытие модальных окон;
* Спиннеры загрузки;
* Валидация форм;
* Страница 404;

## Технологии
* HTML5;
* CSS;
* Flexbox;
* GRID;
* Файловая структура по BEM;
* JavaScript;
* React (функциональные компоненты и хуки);
* Media-запросы для большинства устройств;
* Node.js;
* Express;
* MongodDB;

## Установка и запуск приложения в локальном репозитории, эксплуатация
1. git clone https://github.com/paola-21/react-mesto-api-full-gha.git - клонировать репозиторий (HTTPS) на свое устройство;
2. npm i - установить зависимости (отдельно - в папке frontend и backend);
3. npm run dev - запустить приложение в режиме разработчика в папке backend (можно предварительно настроить порт 3001);
4. npm run start - запустить приложение в режиме разработчика в папке frontend;

## Планы по улучшению

* Открытие и закрытие модальных окон по оверлею и клавише "Escape";
* Вывод в модальном окне после неудачной попытки регистрации/авторизации текста ошибок ("Пользователь с таким электронным адресом уже зарегистрирован", "Неправильный электронный адрес/пароль" и проч.);
* Удаление карточки с модальным окном подтверждения действия;
