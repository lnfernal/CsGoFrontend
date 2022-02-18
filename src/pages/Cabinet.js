import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {AuthContext} from "../context/AuthContext";

export const Cabinet = () => {
    const {loading, request} = useHttp()
    const {isAuthenticated, token, userId, userSubscribe} = useContext(AuthContext)
    const [user, setUser] = useState({})
    const [status, setStatus] = useState(false)
    const status_subscribe = [
        {'subscribe': 'Нет подписки'},
        {'subscribe': 'Без ограничений на месяц'},
        {'subscribe': 'Без ограничений на год'},
        {'subscribe': 'Без ограничений на все сайты'}
    ]
    console.log('auth',isAuthenticated, token, userId, userSubscribe)
    console.log(user)
    const getUser = useCallback(async () => {
        try {
            const data = await request('/api/user/get', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setUser(data.user)
            setStatus(true)
            console.log('user', user)
        } catch (e) {
            console.log(e)
        }
    }, [request])


    useEffect(() => {
        getUser()
    }, [getUser])



    if (loading) {
        return <Loader/>
    }

    return (
        <div className='container'>
            <h1>Кабинет</h1>
            <div className="faq_list">
                <div className="fl a-c j-s-b">
                    {status && user &&
                        <div>
                        <div>Email: {user.email}</div>
                        <div>Подписка: {status_subscribe[user.subscribe]['subscribe']}</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

// CsGoTm - одна из торговых площадок в крупной сети сайтов по продаже игровых скинов.