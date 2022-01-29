import React from 'react'
import skin_model_alt from '../static/img/skin_model_alt.png'
import {Stickers} from './Stickers'
export const GunCard = ({skin}) => {
    return (
        // Выводим скин
        <div className="gun_card" key={skin.id}>
            {skin.hasOwnProperty("price_difference") &&
                <div className="price_difference">
                    {skin.price_difference + '%'}
                </div>
            }
            <div className="price_gun">
                {skin.price.toFixed(2)} ₽
            </div>
            {skin.hasOwnProperty("float") &&
                <div className="float_gun">
                    {skin.float.toFixed(4)}
                </div>
            }
            <a
                href={skin.href}
                className="href_gun"
                rel="noreferrer noopener"
                target="_blank"
            >
                <div className="card_img_place">
                    <img src={skin.href_img} className="card_img" alt={skin.name}/>
                    {skin.hasOwnProperty("stickers") && skin.stickers.length && skin.stickers.map((sticker) =>
                        <Stickers skin={skin} sticker={sticker}/>
                    )}
                </div>
            </a>
            <ul className="data_guns">
                <li>
                    <a
                        href={skin.href} className="name_gun"
                        rel="noreferrer noopener"
                        target="_blank"
                        style={skin.hasOwnProperty("rare_color") ? {color: skin.rare_color} : {color: "#FFF"}}
                    >
                        {skin.name}
                        {skin.hasOwnProperty('stickers') && skin.id_shop === 3 && " (со стикерами)"}
                    </a>
                </li>
                {skin.hasOwnProperty("qualities_name") &&
                    <li>
                        <span
                            className="quality_gun">{skin.qualities_name}
                        </span>
                    </li>
                }
                <li>
                    <a
                        style={{color: skin.shop.color}}
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
