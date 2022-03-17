import React from 'react'

export const StoreCard = ({shop}) => {

    return (
        <div className="flex_shop" key={shop['store'][0].id}>
            <div className="shop_img_place">
                <img src={shop['store'][0].img} alt={shop['store'][0].name} className="shop_img"/>
            </div>
            <div className="shop_info_place">
                <h1>
                    <a href={shop['store'][0].ref_href} className="shop_name">
                        {shop['store'][0].name}
                    </a>
                </h1>
                <div className="shop_info">{shop['store'][0].about_market}</div>
                <div className="shop_preview" dangerouslySetInnerHTML={{ __html: shop['store'][0].about_site} } />
            </div>
        </div>
    )
}