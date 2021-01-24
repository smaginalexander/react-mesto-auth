export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResult(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(res);
}

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(checkResult)
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(checkResult)
        .then((data) => {
            localStorage.setItem('jwt', data.token);
            return data;
        });
}

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
    })
        .then((res) => {
            try {
                if (res.status === 200) {
                    return res.json();
                }
                if (res.status === 401) {
                    return console.log('Токен не передан или передан не в том формате')
                }
            }
            catch (err) {
                return err;
            };
        })
        .then((data) => {
            return data;
        });
}