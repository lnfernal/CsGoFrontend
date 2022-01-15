import React from 'react'

export const GunCard = ({skin}) => {
    return (
        // Выводим скин
        <div className="gun_card" key={skin._id}>
            {skin.price_difference === 0 ? '' :
                <div className="price_difference">
                    {skin.price_difference + '%'}
                </div>
            }
            <div className="price_gun">
                {skin.price.toFixed(2)} ₽
            </div>
            {skin.float === null || skin.float === 0 ? '' :
                <div className="float_gun">
                    {skin.float.toFixed(4)}
                </div>
            }
            <a href={skin.href}
               className="href_gun"
               rel="noreferrer noopener"
               target="_blank"
            >
                <div className="card_img_place">
                    <img src={skin.href_img} className="card_img" alt={skin.name}/>
                </div>
            </a>
            <ul className="data_guns">
                <li>
                    <a href={skin.href} className="name_gun"
                       rel="noreferrer noopener"
                       target="_blank"
                       style={{color: skin.rare_color}}
                    >
                        {skin.name}
                    </a>
                </li>
                <li>
                                    <span
                                        className="quality_gun">{skin.qualities_name}</span>
                </li>
                <li>
                    <a style={{color: skin.shop.color}}
                       className="shop_name"
                       target="_blank"
                       rel="noreferrer noopener"
                       href={skin.shop.href}
                    >
                        {skin.shop.name}
                    </a>
                </li>
            </ul>
        </div>
    )
}
