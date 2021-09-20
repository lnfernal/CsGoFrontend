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
            <h1>Как это работает?</h1>
            <div className="faq_list">
                
            </div>
        </div>
    )
}