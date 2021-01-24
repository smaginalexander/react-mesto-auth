import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as auth from '../utils/auth';

function Register(props) {
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
        auth.register(email, password)
            .then((res) => {
                props.onInfoTooltip(true, 'Вы успешно зарегистрировались!')
                console.log(res)
                if (res) {
                    history.push('/sign-in');
                }
            })
            .catch((err) => {
                props.onInfoTooltip(false, 'Что-то пошло не так! Попробуйте ещё раз.')
                if (err.status === 400) {
                    console.log('Hекорректно заполнено одно из полей')
                } else {
                    console.log(err)
                }
            })
    }

    return (
        <div className="register">
            <h1 className="register__title">Регистрация</h1>
            <form onSubmit={handleSubmit} className="register__form">
                <input onChange={handleChangeEmail} className="register__input" placeholder="Email" />
                <input onChange={handleChangePassword} className="register__input" placeholder="Пароль" type="password" />
                <button className="register__button">Зарегистрироваться</button>
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="login" className="register__login-link">Войти</Link>
            </div>
        </div>
    )
}

export default Register