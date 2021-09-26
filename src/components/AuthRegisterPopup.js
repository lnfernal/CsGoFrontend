import React, {useState, useContext} from 'react'

import {useHttp} from "../hooks/http.hook"
import Notification from "../components/Notification";
import {AuthContext} from '../context/AuthContext'
const Popup = ({active, setActive, page, setPage}) => {
    const {request} = useHttp()
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [form_reg, setForm_reg] = useState({
        email: '',
        password: '',
        rep_password: ''
    })

    let inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].onfocus = function () {
            // let labels = document.getElementsByClassName('label_for_inp');
            // labels[i].classList.add('active');
            // labels[i].innerText = inputs[i].getAttribute('placeholder');
            console.log('Всё окей!');
        }
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const changeHandler_reg = event => {
        setForm_reg({...form_reg, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        if (form_reg.password !== form_reg.rep_password) {
            return <Notification status={1}
                                 message="Пароли не совпадают"/>
        }
        try {
            const data = await request('/api/user/registration', 'POST', {...form_reg})
            if (data['status'] === 'ok') {
                document.body.style.overflow = "auto"
                setActive(false)
                    return <Notification status={1}
                                  message={data['message']}/>


            }
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/user/auth', 'POST', {...form})
            console.log(data)
            auth.login(data.token, data.userId)
            if (data['status'] === 'ok') {
                document.body.style.overflow = "auto"
                setActive(false)

            }
        } catch (e) {
        }
    }
    if (active) document.body.style.overflow = "hidden"

    return (
        <div className={active ? 'popup_place _active' : 'popup_place'} onClick={() => {
            setActive(false)
            document.body.style.overflow = "auto"
        }}>
            <div className={active ? 'auth_registr_popup _active' : 'auth_registr_popup'}
                 onClick={e => e.stopPropagation()}>
                <div className='close_popup_place'>
                    <div
                        className={page === 1 ? "auth_btn _active" : "auth_btn"}
                        onClick={() => {
                            setPage(1)
                        }}>
                        <span className="fas fa-user">

                        </span>Войти
                    </div>
                    <div className="close_popup" onClick={() => {
                        setActive(false)
                        document.body.style.overflow = "auto"
                    }}>
                        <span className="fa fa-times">

                        </span>
                    </div>
                    <div
                        className={page === 2 ? "registr_btn _active" : "registr_btn"}
                        onClick={() => {
                            setPage(2)
                        }}>
                        <span className="fas fa-user-plus">
                        </span>Регистрация
                    </div>
                </div>
                <div className={page === 1 ? 'authorization_popup _active' : 'authorization_popup'}>
                    <div className="about_popup">
                        Trade-Helper - это лучший помощник для трейдеров на скинах.
                        <br/> Здесь вы можете:
                        <div className="flex_add">
                        <span className="fa fa-search">
                        </span>
                            <div className="about_info"> Легко найти желаемый скин</div>
                        </div>
                        <div className="flex_add">
                        <span className="fas fa-compress-arrows-alt">
                        </span>
                            <div className="about_info">Сравнить скины с разных торговых площадок</div>
                        </div>
                    </div>

                    <div className="label_for_inp">

                    </div>
                    <input
                        className='filter_input'
                        name='email'
                        type='email'
                        value={form.email}
                        placeholder='Введите Email'
                        onChange={changeHandler}
                    />
                    <div className="label_for_inp">

                    </div>
                    <input
                        className='filter_input'
                        name='password'
                        type='password'
                        value={form.password}
                        placeholder='Введите пароль'
                        onChange={changeHandler}
                    />

                    <div className="send_btn" onClick={loginHandler}>Войти в аккаунт</div>

                    <div className="auth_registr_text">
                        Нет аккаунта?
                        <span
                            className="small_href"
                            onClick={() => {
                                setPage(2)
                            }}
                        >Зарегистрироваться</span>
                    </div>
                </div>
                <div className={page === 2 ? 'registration_popup _active' : 'registration_popup'}>
                    <div className="about_popup">
                        Trade-Helper - это лучший помощник для трейдеров на скинах.
                        <br/> Здесь вы можете:
                        <div className="flex_add">
                        <span className="fa fa-search">
                        </span>
                            <div className="about_info"> Легко найти желаемый скин</div>
                        </div>
                        <div className="flex_add">
                        <span className="fas fa-compress-arrows-alt">
                        </span>
                            <div className="about_info">Сравнить скины с разных торговых площадок</div>
                        </div>
                    </div>
                    <div className="label_for_inp">

                    </div>
                    <input
                        className='filter_input'
                        name='email'
                        type='email'
                        value={form_reg.email}
                        placeholder='Введите Email'
                        onChange={changeHandler_reg}
                    />
                    <div className="label_for_inp">

                    </div>
                    <input
                        className='filter_input'
                        name='password'
                        type='password'
                        value={form_reg.password}
                        placeholder='Введите желаемый пароль'
                        onChange={changeHandler_reg}
                    />
                    <div className="label_for_inp">

                    </div>
                    <input
                        className='filter_input'
                        name='rep_password'
                        type='password'
                        value={form_reg.rep_password}
                        placeholder='Повторите пароль'
                        onChange={changeHandler_reg}
                    />
                    <div className="send_btn" onClick={registerHandler}>Зарегистрироваться</div>

                    <div className="auth_registr_text">
                        Уже есть аккаунт?
                        <span
                            className="small_href"
                            onClick={() => {
                                setPage(1)
                            }}
                        >Войти</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup