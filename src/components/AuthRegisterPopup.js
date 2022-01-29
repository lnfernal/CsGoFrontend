import React, {useState, useContext} from 'react'

import {useHttp} from "../hooks/http.hook"
import Notification from "../components/Notification";
import {AuthContext} from '../context/AuthContext'
import {useHistory} from "react-router-dom";


const Popup = ({active, setActive, page, setPage}) => {
    const {request, loading} = useHttp()
    const auth = useContext(AuthContext)
    let [popupActive, setPopupActive] = useState(false)
    let [message, setMessage] = useState('')
    let [status, setStatus] = useState(0)
    const history = useHistory()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const [form_reg, setForm_reg] = useState({
        email: '',
        password: '',
        rep_password: ''
    })

    let inputs = document.getElementsByClassName('auth_reg_input');
    let labels = document.getElementsByClassName('label_for_inp');

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value !== '') {
            labels[i].classList.add('_active');
            labels[i].innerText = inputs[i].getAttribute('placeholder');
        }
        inputs[i].onfocus = function () {
            labels[i].classList.add('_active');
            labels[i].innerText = inputs[i].getAttribute('placeholder');
        }
        inputs[i].onchange = function () {
            if (inputs[i].value === '') {
                labels[i].classList.remove('_active')
                labels[i].innerText = "";
            }
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
            setPopupActive(true)
            setStatus(2)
            return setMessage("Пароли не совпадают")
        }
        try {
            const data = await request('/api/user/registration', 'POST', {...form_reg})
            console.log("data_reg", data)
            if (data['status'] === 'ok') {
                document.body.classList.remove("hidden")
                setActive(false)
                setStatus(1)
            } else {
                setStatus(2)
            }
            setMessage(data['message'])
            setPopupActive(true)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/user/auth', 'POST', {...form})
            console.log(data)
            if (data['status'] === 'ok') {
                document.body.classList.remove("hidden")
                setActive(false)
                setStatus(1)
                auth.login(data.token, data.userId, data.userSubscribe)
                return history.push('/index')
            } else {
                setStatus(2)
            }
            setMessage(data['message'])
            return setPopupActive(true)
        } catch (e) {
            setStatus(2)
            setMessage(e)
        }
    }
    if (active) document.body.classList.add("hidden")
    return (
        <div className={active ? 'popup_place _active' : 'popup_place'} onClick={() => {
            setActive(false)
            document.body.classList.remove("hidden")
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
                       document.body.classList.remove("hidden")
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
                        <span className="mini_logo">Trade-Helper</span> - это лучший помощник для трейдеров на скинах.
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
                    <div className="inp_lab_reg_place">
                        <div className="label_for_inp">

                        </div>
                        <input
                            className='filter_input auth_reg_input'
                            name='email'
                            type='email'
                            value={form.email}
                            placeholder='Введите Email'
                            onChange={changeHandler}
                            autoComplete="off"
                        />
                    </div>
                    <div className="inp_lab_reg_place">
                        <div className="label_for_inp">

                        </div>
                        <input
                            className='filter_input auth_reg_input'
                            name='password'
                            type='password'
                            value={form.password}
                            placeholder='Введите пароль'
                            onChange={changeHandler}
                            autoComplete="off"
                        />
                    </div>

                    <button className="send_btn" onClick={loginHandler} disabled={loading}>Войти в аккаунт</button>

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
                        <span className="mini_logo">Trade-Helper</span> - это лучший помощник для трейдеров на скинах.
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
                    <div className="inp_lab_reg_place">
                        <div className="label_for_inp">

                        </div>
                        <input
                            className='filter_input auth_reg_input'
                            name='email'
                            type='email'
                            value={form_reg.email}
                            placeholder='Введите Email'
                            onChange={changeHandler_reg}
                        />
                    </div>
                    <div className="inp_lab_reg_place">
                        <div className="label_for_inp">

                        </div>
                        <input
                            className='filter_input auth_reg_input'
                            name='password'
                            type='password'
                            value={form_reg.password}
                            placeholder='Введите желаемый пароль'
                            onChange={changeHandler_reg}
                        />
                    </div>
                    <div className="inp_lab_reg_place">
                        <div className="label_for_inp">

                        </div>
                        <input
                            className='filter_input auth_reg_input'
                            name='rep_password'
                            type='password'
                            value={form_reg.rep_password}
                            placeholder='Повторите пароль'
                            onChange={changeHandler_reg}
                        />
                    </div>
                    <button className="send_btn" onClick={registerHandler} disabled={loading}>Зарегистрироваться
                    </button>

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
            {popupActive &&
            <Notification setActive={setPopupActive} active={popupActive} status={status} message={message} />}
        </div>
    )
}

export default Popup