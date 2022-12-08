class Api {
    #baseUrl;
    #headers;
    constructor({ baseUrl, headers }) {
        this.#baseUrl = baseUrl;
        this.#headers = headers;
    };

    async getDataAsync() {
        const promise = await fetch(`${this.#baseUrl}/cards`, {
            method: 'GET',    
            credentials: 'include',        
            headers: this.#headers
        });
        return promise;
    }

    async saveCardAsync(placeName, placeLink) {
        const promise = await fetch(`${this.#baseUrl}/cards`, {
            method: 'POST',
            credentials: 'include', 
            headers: this.#headers,
            body: JSON.stringify({
                name: placeName,
                link: placeLink
            })
        });
        return promise;
    };

    async changeLikeCardStatusAsync(id, like) {
        const url = `${this.#baseUrl}/cards`;
        const _method = like ? 'PUT' : 'DELETE';
        const promise = await fetch(`${url}/${id}/likes`, {
            method: _method,
            credentials: 'include', 
            headers: this.#headers
        });
        return promise;
    };

    async deleteCardAsync(id) {
        const url = `${this.#baseUrl}/cards`;
        const promise = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            credentials: 'include', 
            headers: this.#headers
        });
        return promise;
    };

    async setUserInfoAsync(userName, description) {
        const url = `${this.#baseUrl}/users/me`;
        const promise = await fetch(`${url}`, {
            method: 'PATCH',
            credentials: 'include', 
            headers: this.#headers,
            body: JSON.stringify({
                name: userName,
                about: description
            })
        });
        return promise;
    };
    async setAvatarAsync(link) {
        const promise = await fetch(`${this.#baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            credentials: 'include', 
            headers: this.#headers,
            body: JSON.stringify({
                avatar: link
            })
        });
        return promise;
    }
}

const api = new Api(
    {
        baseUrl: process.env.REACT_APP_API_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    }
);

export default api;
