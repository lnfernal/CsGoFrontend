import React, {useState, useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../context/AuthContext";
import AuthRegisterPopup from "../components/AuthRegisterPopup";

export const Utilites = () => {
    let [popupActive, setPopupActive] = useState(false)
    let [page, setPage] = useState(0)
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    console.log("auth", auth)
    if (!auth.isAuthenticated) {
        return (
            <header className="header">
                <div className="container_header">
                    <div className="header_place">
                        <a className="logo" href="/main">
                            Trade-Helper
                        </a>
                        <nav className="nav">
                            <NavLink to="/main" className="nav_link">
                                <div className="nav_item">
                                <span className="fa fa-home nav_item_icon">

                                </span>
                                    Главная
                                </div>
                            </NavLink>
                            <NavLink to="/stores" className="nav_link">
                                <div className="nav_item">
                                <span className="fas fa-store-alt nav_item_icon">

                                </span>
                                    Магазины
                                </div>
                            </NavLink>
                            <NavLink to="/faq" className="nav_link">
                                <div className="nav_item ">
                                <span className="fas fa-question nav_item_icon">

                                </span>
                                    FAQ
                                </div>
                            </NavLink>
                            <NavLink to="/subscribe" className="nav_link">
                                <div className="nav_item">
                                <span className="fas fa-dollar-sign nav_item_icon">

                                </span>
                                    Подписаться
                                </div>
                            </NavLink>
                        </nav>


                        <div className="currency-selector">
                        <span className="fas fa-flag">
                        </span> RU
                            <div className="currency-selector-list">
                                <div className="currency-selector-item">
                               <span className="fas fa-flag">
                               </span> EN
                                </div>
                                <div className="currency-selector-item">
                                <span className="fas fa-flag">
                                </span> GER
                                </div>
                            </div>
                        </div>

                        <div className="country-selector">s
                            <span className="fas fa-ruble-sign">
                        </span> RUB
                            <div className="country-selector-list">
                                <div className="country-selector-item">
                               <span className="fas fa-dollar-sign">
                               </span> DOL
                                </div>
                                <div className="country-selector-item">
                                <span className="fas fa-euro-sign">
                                </span> EUR
                                </div>
                            </div>
                        </div>


                        <div className="nav-link" onClick={() => {
                            setPage(1)
                            setPopupActive(true)
                        }}>
                            <div className="nav_item">
                                Войти
                            </div>
                        </div>

                        <div className="nav-link" onClick={() => {
                            setPage(2)
                            setPopupActive(true)
                        }}>
                            <div className="nav_item">
                                Регистрация
                            </div>
                        </div>
                    </div>
                </div>
                <AuthRegisterPopup active={popupActive} setActive={setPopupActive} setPage={setPage} page={page}/>
            </header>

        )
    }
    return (
        <header className="header">
            <div className="container_header">
                <div className="header_place">
                    <a className="logo" href="/main">
                        Trade-Helper
                    </a>
                    <nav className="nav">
                        <NavLink to="/main" className="nav_link">
                            <div className="nav_item">
                                <span className="fa fa-home nav_item_icon">

                                </span>
                                Главная
                            </div>
                        </NavLink>
                        <NavLink to="/stores" className="nav_link">
                            <div className="nav_item">
                                <span className="fas fa-store-alt nav_item_icon">

                                </span>
                                Магазины
                            </div>
                        </NavLink>
                        <NavLink to="/faq" className="nav_link">
                            <div className="nav_item ">
                                <span className="fas fa-question nav_item_icon">

                                </span>
                                FAQ
                            </div>
                        </NavLink>
                        <NavLink to="/subscribe" className="nav_link">
                            <div className="nav_item">
                                <span className="fas fa-dollar-sign nav_item_icon">

                                </span>
                                Подписаться
                            </div>
                        </NavLink>
                    </nav>


                    <div className="currency-selector">
                        <span className="fas fa-flag">
                        </span> RU
                        <div className="currency-selector-list">
                            <div className="currency-selector-item">
                               <span className="fas fa-flag">
                               </span> EN
                            </div>
                            <div className="currency-selector-item">
                                <span className="fas fa-flag">
                                </span> GER
                            </div>
                        </div>
                    </div>

                    <div className="country-selector">
                        <span className="fas fa-ruble-sign">
                        </span> RUB
                        <div className="country-selector-list">
                            <div className="country-selector-item">
                               <span className="fas fa-dollar-sign">
                               </span> DOL
                            </div>
                            <div className="country-selector-item">
                                <span className="fas fa-euro-sign">
                                </span> EUR
                            </div>
                        </div>
                    </div>

                    <NavLink to="/cabinet" className="nav_link">
                        <div className="nav_item">
                                <span className="fas fa-user nav_item_icon">

                                </span>
                            Кабинет
                        </div>
                    </NavLink>


                    <div className="exit_place" onClick={logoutHandler}>
                        <span className="fas fa-sign-out-alt nav_item_icon">

                        </span>
                    </div>


                </div>
            </div>
        </header>

    )
}


