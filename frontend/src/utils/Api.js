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
        credentials: 'include',
    });
    return p.then(this._getJson); 
 }

 createCardApi(newItem) {
    return fetch(`${this._basePath}/cards`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify(newItem),
        credentials: 'include',
    }).then(this._getJson); 
   }

  getCurrentUser() {
    return fetch(`${this._basePath}/users/me`, {
        headers: this._getHeaders(),
        credentials: 'include',
      }).then(this._getJson);
   }

  editProfile(data) {
   return fetch(`${this._basePath}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
         name: data.name,
         about: data.about,
         avatar: data.avatar
      }),
      credentials: 'include',
    }).then(this._getJson);
  }

  editAvatar(avatar) {
   return fetch(`${this._basePath}/users/me/avatar`, {
       method: "PATCH",
       headers: this._getHeaders(),
       body: JSON.stringify(avatar),
       credentials: 'include',
   }).then(this._getJson);
  }

  deleteCard(id) {
   return fetch(`${this._basePath}/cards/${id}`, {
     method: "DELETE",
     headers: this._getHeaders(),
     credentials: 'include',
   }).then(this._getJson);
 }

  clickLike(id) {
   return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._getHeaders(),
      credentials: 'include',
    }).then(this._getJson);
  }

  deleteLike(id) {
   return fetch(`${this._basePath}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._getHeaders(),
      credentials: 'include',
    }).then(this._getJson);
  }

}

const api = new Api('https://api.paola.mesto.nomoreparties.sbs', `Bearer ${localStorage.getItem('token')}`);

export {api};