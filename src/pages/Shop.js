import React, {useCallback, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {Loader} from "../components/Loader"
// import {LinkCard} from '../components/LinkCard'
export const Shop = () => {
    const {request, loading} = useHttp()
    const [store, setStore] = useState(null)

    const storeId = useParams().shop_id
    const getStore = useCallback(async () => {
        try {
            const shop = await request(`/api/get/shop?shop_id=${storeId}`, 'GET', null, {})
            console.log(shop)
            setStore({store: shop})
        } catch (e) {
        }
    }, [storeId, request])

    useEffect(() => {
        getStore()
    }, [getStore])

    if (loading) {
      return <Loader />
    }
    console.log(store)

    return (
        <div className="container">
        <div className="flex_shop" key={store['store'].id}>
                <div className="shop_img_place">
                     <img src={store['store'].img} alt={store['store'].name} className="shop_img"/>
                </div>
                 <div className="shop_info_place">
                     <h1 className="shop_name">
                        {store['store'].name}
                     </h1>
                     <div className="shop_preview">
                         {store['store'].about_site}
                    </div>
                     <div className="shop_info">
                        {store['store'].about_market}
                    </div>
                 </div>
            </div>
        </div>
    )
}

