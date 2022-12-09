const REACT_APP_BASE_URL = process.env.REACT_APP_API_URL;

export const register = async (password, email) => {
    const promise = await fetch(`${REACT_APP_BASE_URL}/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    });
    return promise;
};

export const authorize = async (password, email) => {
    const promise = await fetch(`${REACT_APP_BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    });
    return promise;
};

export const logout = async () => {
    const promise = await fetch(`${REACT_APP_BASE_URL}/signuot`, {
        method: 'GET', 
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return promise;
}

export const getMe = async () => {
    const promise = await fetch(`${REACT_APP_BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return promise;
};

export const verifyAccess = async () => {
    const promise = await fetch(`${REACT_APP_BASE_URL}/users/access`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return promise;
} 