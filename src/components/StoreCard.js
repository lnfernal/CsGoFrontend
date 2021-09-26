import React from 'react'

export const StoreCard = ({shop}) => {

    return (
        <div className="flex_shop" key={shop['store'][0].id}>
            <div className="shop_img_place">
                <img src={shop['store'][0].img} alt={shop['store'][0].name} className="shop_img"/>
            </div>
            <div className="shop_info_place">
                <h1 className="shop_name">
                    {shop['store'][0].name}
                </h1>
                <div className="shop_preview">
                    {shop['store'][0].about_site}
                </div>
                <div className="shop_info">
                    {shop['store'][0].about_market}
                </div>
            </div>
        </div>)
}