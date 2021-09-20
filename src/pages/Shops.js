import React, {useCallback, useState, useEffect} from 'react'
import {useHttp} from "../hooks/http.hook"
import {StoresCards} from "../components/StoresCards";
import {Loader} from "../components/Loader";

export const Shops = () => {
    const {request, loading} = useHttp()
    const [shops, setShops] = useState(null)
    const getShops = useCallback(async () => {
        try {
            const data = await request(`/api/get/shops`, 'GET', null)
            console.log(data)
            setShops(data['stores'])
        } catch (e) {
        }
    }, [request])


    useEffect(() => {
        getShops()
    }, [getShops])


   if (loading) {
        return <Loader/>
    }
    return (
        <div className='container'>
            <h1>Магазины</h1>
            {!loading && shops && <StoresCards shops={shops}/>}
        </div>
    )
}

