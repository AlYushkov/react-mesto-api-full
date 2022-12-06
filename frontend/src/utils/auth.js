const REACT_APP_BASE_URL = process.env.REACT_APP_MODE === 'develop'  ? 'http://localhost:3001' : 'https://mesta.students.nomoredomains.club';

export const register = async (password, email) => {
    const res = await fetch(`${REACT_APP_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    });
    return res;
};

export const authorize = async (password, email) => {
    const res = await fetch(`${REACT_APP_BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    });
    return res;
};

export const logout = async () => {
    const res = await fetch(`${REACT_APP_BASE_URL}/signuot`, {
        method: 'GET', 
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    return res;
}

export const getMe = async () => {
    const res = await fetch(`${REACT_APP_BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return res;
};

export const verifyAccess = async () => {
    const res = await fetch(`${REACT_APP_BASE_URL}/users/access`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    return res;
} 