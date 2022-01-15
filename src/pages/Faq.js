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
                <div>Здесь вы можете:</div>
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
                <div>Для чего нужна подписка?</div>
                <div className="faq_data">
                    - Подписка даёт возможность пользоваться сайтом без ограничений.
                    <br/> - Пользователям, не купившим подписку, доступны к просмотру скины до 500 рублей.
                </div>
                Как часто происходит обновление информации?
                <div className="faq_data">
                    - Обновление происходит ежедневно в 00:00 по Московскому времени.
                </div>
                Как оформить подписку?
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