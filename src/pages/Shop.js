import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from "../components/Loader"
import {StoreCard} from "../components/StoreCard";
export const Shop = () => {
    const {request, loading} = useHttp()
    const [store, setStore] = useState(null)
    const storeId = useParams().id
    const getStore = useCallback(async () => {
        try {
            const shop = await request(`/api/get/shop/${storeId}`, 'GET', null)
            console.log('Shop', shop)
            setStore(shop)
        } catch (e) {
        }
    }, [storeId, request])

    useEffect(() => {
        getStore()
    }, [getStore])

    if (loading) {
        return <Loader/>
    }
        return (
            <div className="container">
                {!loading && store && <StoreCard shop={store}/>}
            </div>
        )

}

