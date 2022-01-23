import React from 'react'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";

export const Faq = () => {
    const {loading} = useHttp()
    if (loading) {
        return <Loader/>
    }
    return (
        <div className='container'>
            <h1>FAQ</h1>
            <div className="faq_list">
                <span className="logo">Trade-Helper</span> - это лучший помощник для скин трейдеров.
                <h3 className="faq_heading">Здесь вы можете:</h3>
                <ul className="faq_ul_list">
                    <li>
                        Увидеть детальную информацию о более, чем 10000 скинах с самых популярных торговых площадок.
                    </li>
                    <li>
                        Сравнить цены желаемых скинов.
                    </li>
                    <li>
                        Воспользоваться удобным поиском.
                    </li>
                </ul>
                <h3 className="faq_heading">У нас нельзя:</h3>
                <ul className="faq_ul_list">
                    <li>
                        Покупать, продавать и обмениваться предметами.
                    </li>
                </ul>
                <h3 className="faq_heading">Для чего нужна подписка?</h3>
                <div className="faq_data">
                    - Подписка даёт возможность пользоваться сайтом без ограничений.
                    <br/> - Пользователям, не купившим подписку, доступны к просмотру скины до 500 рублей.
                </div>
                <h3 className="faq_heading">Как часто происходит обновление информации?</h3>
                <div className="faq_data">
                    - Обновление происходит ежедневно в 00:00 по Московскому времени.
                </div>
                <h3 className="faq_heading">Как оформить подписку?</h3>
                <div className="faq_data">
                    <ul className="faq_ul_list">
                        <li>
                            Зарегистрироваться.
                        </li>
                        <li>
                            Авторизоваться.
                        </li>
                        <li>
                            Перейти во вкладку "Подписаться" в шапке сайта и выбрать тариф.
                        </li>
                        <li>
                            Оплатить сумму любым удобным способом.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}