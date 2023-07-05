class Api {
  constructor (basePath, token) {
    this._basePath = basePath;
    this._token = token;
 }

 _getHeaders() {
    return { 
    "Content-Type": "application/json",
    authorization: this._token,
    };
 }

 _getJson(res) {
    if (res.ok) {
        return res.json();
     }
        return Promise.reject(`Ошибка: ${res.status}`);
  }

 getCard () {
    const p = fetch(`${this._basePath}/cards`, {
        headers: this._getHeaders(),
    });
    return p.then(this._getJson); 
 }

 createCardApi(newItem) {
    return fetch(`${this._basePath}/cards`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify(newItem)
    }).then(this._getJson); 
   }

  getCurrentUser() {
    return fetch(`${this._basePath}/users/me`, {
        headers: this._getHeaders(),
      }).then(this._getJson);
   }

  editProfile(profile) {
   return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
         name: profile.name,
         about: profile.about,
         avatar: profile.avatar
      })
    }).then(this._getJson);
  }

  editAvatar(avatar) {
   return fetch(`${this._basePath}/users/me/avatar`, {
       method: "PATCH",
       headers: this._getHeaders(),
       body: JSON.stringify(avatar)
   }).then(this._getJson);
  }

  deleteCard(id) {
   return fetch(`${this._basePath}/cards/${id}`, {
     method: "DELETE",
     headers: this._getHeaders(),
   }).then(this._getJson);
 }

  clickLike(id) {
   return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

  deleteLike(id) {
   return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._getJson);
  }

}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-61', 'd2a883d2-7a67-4338-99ad-75e867144356');

export {api};