import React from 'react'
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";


export const Cabinet = () => {
    const {loading} = useHttp()
    if (loading) {
        return <Loader/>
    }
    return (
        <div className='container'>
            <h1>Кабинет</h1>
            <div className="faq_list">

            </div>
        </div>
    )
}