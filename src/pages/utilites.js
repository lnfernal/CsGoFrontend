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
        history.push('/index')
    }
    const mobile_nav = document.getElementsByClassName("computer_menu")[0];
    const mobile_menu = document.getElementById("mobile_menu");
    const links = document.getElementsByClassName("nav_link");
    for (let link of links) {
        link.onclick = () => {
            mobile_menu.classList.remove("_active");
            mobile_nav.classList.remove("_active");
            document.body.classList.remove("hidden");
        }
    }
    const mobileMenu = () => {
        mobile_menu.classList.toggle("_active");
        document.body.classList.toggle("hidden");
        mobile_nav.classList.toggle("_active");
    }
    const openAuthRegistr = (page) => {
        setPage(page)
        setPopupActive(true)
        mobile_menu.classList.remove("_active");
        document.body.classList.remove("hidden");
        mobile_nav.classList.remove("_active");
    }
    if (!auth.isAuthenticated) {
        return (
            <header className="header">
                <div className="container_header">
                    <div className="header_place">
                        <NavLink className="logo" to="/index">
                            Trade-Helper
                        </NavLink>
                        <div className="computer_menu">
                            <nav className="nav">
                                <NavLink to="/index" className="nav_link">
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
                            {/*    <div className="currency-selector">*/}
                            {/*<span className="fas fa-flag">*/}
                            {/*</span> RU*/}
                            {/*        <div className="currency-selector-list">*/}
                            {/*            <div className="currency-selector-item">*/}
                            {/*       <span className="fas fa-flag">*/}
                            {/*       </span> EN*/}
                            {/*            </div>*/}
                            {/*            <div className="currency-selector-item">*/}
                            {/*        <span className="fas fa-flag">*/}
                            {/*        </span> GER*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}

                            {/*    <div className="country-selector">*/}
                            {/*    <span className="fas fa-ruble-sign">*/}
                            {/*</span> RUB*/}
                            {/*        <div className="country-selector-list">*/}
                            {/*            <div className="country-selector-item">*/}
                            {/*       <span className="fas fa-dollar-sign">*/}
                            {/*       </span> DOL*/}
                            {/*            </div>*/}
                            {/*            <div className="country-selector-item">*/}
                            {/*        <span className="fas fa-euro-sign">*/}
                            {/*        </span> EUR*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            <div className="right_header_part">
                                <div className="nav-link" onClick={()=> {
                                    openAuthRegistr(1)
                                }}>
                                    <div className="nav_item">
                                        Войти
                                    </div>
                                </div>

                                <div className="nav-link" onClick={()=> {
                                    openAuthRegistr(2)
                                }}>
                                    <div className="nav_item">
                                        Регистрация
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mobile_menu_place" id="mobile_menu"
                             onClick={() => {
                                 const mobile_nav = document.getElementsByClassName("computer_menu")[0];
                                 const mobile_menu = document.getElementById("mobile_menu");
                                 mobile_menu.classList.toggle("_active");
                                 mobile_nav.classList.toggle("_active");
                             }}
                        >
                        <span>

                        </span>
                            <span>

                        </span>
                            <span>

                        </span>
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
                    <div className="logo_place">
                        <NavLink className="logo" to="/index">
                            Trade-Helper
                        </NavLink>
                    </div>
                    <div className="computer_menu">
                        <nav className="nav">
                            <NavLink to="/index" className="nav_link">
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


                        {/*<div className="currency-selector">*/}
                        {/*<span className="fas fa-flag">*/}
                        {/*</span> RU*/}
                        {/*    <div className="currency-selector-list">*/}
                        {/*        <div className="currency-selector-item">*/}
                        {/*       <span className="fas fa-flag">*/}
                        {/*       </span> EN*/}
                        {/*        </div>*/}
                        {/*        <div className="currency-selector-item">*/}
                        {/*        <span className="fas fa-flag">*/}
                        {/*        </span> GER*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*<div className="country-selector">*/}
                        {/*<span className="fas fa-ruble-sign">*/}
                        {/*</span> RUB*/}
                        {/*    <div className="country-selector-list">*/}
                        {/*        <div className="country-selector-item">*/}
                        {/*       <span className="fas fa-dollar-sign">*/}
                        {/*       </span> DOL*/}
                        {/*        </div>*/}
                        {/*        <div className="country-selector-item">*/}
                        {/*        <span className="fas fa-euro-sign">*/}
                        {/*        </span> EUR*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="right_header_part">
                            <NavLink to="/cabinet" className="nav_link" onClick={() => {
                                mobile_menu.classList.remove("_active")
                                mobile_nav.classList.remove("_active")
                                document.body.classList.remove("hidden")
                            }}>
                                <div className="nav_item">
                                <span className="fas fa-user nav_item_icon">
                                </span>
                                    Кабинет
                                </div>
                            </NavLink>
                            <a href="/" className="exit_place" onClick={logoutHandler}>
                        <span className="fas fa-sign-out-alt nav_item_icon">
                        </span>
                            </a>
                        </div>
                    </div>
                    <div className="mobile_menu_place" id="mobile_menu"
                         onClick={mobileMenu}
                    >
                            <span>

                            </span>
                        <span>

                            </span>
                        <span>

                            </span>
                    </div>
                </div>
            </div>
        </header>
    )
}


