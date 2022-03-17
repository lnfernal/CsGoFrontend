import React from 'react'
import {Stickers} from './Stickers'
export const GunCard = ({skin}) => {
    const englishQualities = [
        '',
        'bs',
        'ww',
        'ft',
        'mw',
        'fn'
    ]

    return (
        // Выводим скин
        <div className="gun_card">
            {skin.hasOwnProperty("price_difference") &&
                <div className="price_difference">
                    {skin.price_difference + '%'}
                </div>
            }
            <div className="price_gun">
                {skin.price.toFixed(2)} ₽
            </div>

            <a
                href={skin.href}
                className="href_gun"
                rel="noreferrer noopener"
                target="_blank"
            >
                <div className="card_img_place">
                    <img src={skin.href_img} className="card_img" alt={skin.name}/>
                    {skin.hasOwnProperty("stickers") && skin.stickers.length && skin.stickers.map((sticker) =>
                        <Stickers sticker={sticker} key={`sticker-${skin._id}`}/>
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
                        {skin.hasOwnProperty("float") && " / " + skin.float.toFixed(4)}
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
            <div className="steam_data">
                <a
                    href={"https://steamcommunity.com/market/search?appid=730&q=" + skin.name + " " + skin.qualities_name}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <img src="https://steamcommunity.com/favicon.ico" alt="steam" />
                </a>
            </div>
            <div className="csmoney_data">
                <a
                    href={"https://cs.money/ru/csgo/store/?search=" + skin.name + " " + englishQualities[skin.quality]}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    <img src="https://cs.money/img/favicon.png" alt="CSMONEY" />
                </a>
            </div>
        </div>
    )
}
