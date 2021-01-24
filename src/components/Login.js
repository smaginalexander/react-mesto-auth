import React from 'react';
import { useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';

function Login(props) {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const history = useHistory();

    const handleChangeEmail = (evt) => {
        setEmail(evt.target.value);
    }
    const handleChangePassword = (evt) => {
        setPassword(evt.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        auth.authorize(email, password)
            .then((res) => {
                if (res) {
                    props.handleLogin(email);
                    history.push('/');
                }
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.log('Hекорректно заполнено одно из полей')
                } if (err.status === 401) {
                    console.log('пользователь с email не найден ')
                } else {
                    console.log(err)
                }
            })
    }
    return (
        <div className="register">
            <h1 className="register__title">Вход</h1>
            <form onSubmit={handleSubmit} className="register__form">
                <input onChange={handleChangeEmail} className="register__input" placeholder="Email" />
                <input onChange={handleChangePassword} className="register__input" placeholder="Пароль" type="password" />
                <button className="register__button">Войти</button>
            </form>
        </div>
    )
}

export default Login