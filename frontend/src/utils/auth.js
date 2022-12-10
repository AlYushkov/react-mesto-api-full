const baseUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

export const register = async (password, email) => {
    const promise = await fetch(`${baseUrl}/signup`, {
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
    const promise = await fetch(`${baseUrl}/signin`, {
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
    const promise = await fetch(`${baseUrl}/signuot`, {
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
    const promise = await fetch(`${baseUrl}/users/me`, {
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
    const promise = await fetch(`${baseUrl}/users/access`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return promise;
} 