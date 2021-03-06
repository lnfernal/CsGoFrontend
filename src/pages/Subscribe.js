import React from 'react'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";

export const Subscribe = () => {
    const {loading} = useHttp()
    if (loading) {
        return <Loader/>
    }
    return (
        <div className='container'>
            <h1>Подписка</h1>
            <div className="subscribe_place">
                <div className="subscribe_item">
                    <div className="subscribe_data">
                        <h3 className="zagolovok">Тариф "Без ограничений" на месяц</h3>
                        <div className="subscribe_text">
                            Возможность смотреть полный каталог скинов без ограничений
                        </div>
                        <div className="flex">
                            <div className="payment_text">
                                Подписка на месяц
                            </div>
                            <div className="payment_price">
                                250₽
                            </div>
                        </div>
                        <div className="send_btn">
                            Купить
                        </div>
                    </div>
                </div>
                <div className="subscribe_item">
                    <div className="subscribe_data">
                        <h3 className="zagolovok">Тариф "Без ограничений" на год</h3>
                        <div className="subscribe_text">
                            Возможность смотреть полный каталог скинов без ограничений
                        </div>
                        <div className="flex">
                            <div className="payment_text">
                                Подписка на год
                            </div>
                            <div className="payment_price">
                                2500₽
                            </div>
                        </div>
                        <div className="send_btn">
                            Купить
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}