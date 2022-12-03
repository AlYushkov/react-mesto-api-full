const BASE_URL = process.env.REACT_APP_MODE === 'develop' ? 'http://localhost:3001' : 'api.mesta.students.nomoredomains.club';
class Api {
    #baseUrl;
    #headers;
    constructor({ baseUrl, headers }) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    };

    async getDataAsync(endPoint) {
        const res = await fetch(`${this.#baseUrl}/${endPoint}`, {
            method: 'GET',    
            credentials: 'include',        
            headers: this.#headers
        });
        return res;
    }

    async saveCardAsync(placeName, placeLink) {
        const res = await fetch(`${this.#baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include', 
            headers: this.#headers,
            body: JSON.stringify({
                name: placeName,
                link: placeLink
            })
        });
        return res;
    };

    async changeLikeCardStatusAsync(id, like) {
        const url = `${this.#baseUrl}/cards`;
        const _method = like ? 'PUT' : 'DELETE';
        const res = await fetch(`${url}/${id}/likes`, {
            method: _method,
            credentials: 'include', 
            headers: this.#headers
        });
        return res;
    };

    async deleteCardAsync(id) {
        const url = `${this.#baseUrl}/cards`;
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            credentials: 'include', 
            headers: this.#headers
        });
        return res;
    };

    async setUserInfoAsync(userName, description) {
        const url = `${this.#baseUrl}/users/me`;
        const res = await fetch(`${url}`, {
            method: 'PATCH',
            credentials: 'include', 
            headers: this.#headers,
            body: JSON.stringify({
                name: userName,
                about: description
            })
        });
        return res;
    };
    async setAvatarAsync(link) {
        const res = await fetch(`${this.#baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include', 
            headers: this.#headers,
            body: JSON.stringify({
                avatar: link
            })
        });
        return res;
    }
}

const api = new Api(
    {
        baseUrl: BASE_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export default api;
