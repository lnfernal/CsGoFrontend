import React from 'react'
export const GunCards = ({skins}) => {
    const shops_name = [
        {name: 'Steam', href: 'https://steamcommunity.com/market/search?appid=730', color: '#316282'},
        {name: 'CsGoTm', href: 'https://market.csgo.com', color: '#82c4c9'},
        {name: 'CsGo500', href: 'https://csgo500tr.com/r/INTERNETMONEY', color: '#c32d4f'},
        {name: 'DMarket', href: 'https://dmarket.com?ref=aD4yxOg5hp', color: '#66ca88'}
    ]

    console.log('skins', skins)
    if (!skins['skins'].length) {
        return <p className="center">Скинов по такому запросу не найдено.</p>
    }

    return (
        // Выводим скины
        skins['skins'].map((skin) => {
                    return (
                        <div className="gun_card" key={skin._id}>
                            <div className="price_difference">
                                -30%
                            </div>
                            <div className="price_gun">
                                {skin.price.toFixed(2)} ₽
                            </div>
                            <a href={skin.href} className="href_gun" rel="noreferrer noopener" target="_blank">
                                <div className="card_img_place">
                                    <img src={skin.href_img} className="card_img" alt={skin.name}/>
                                </div>
                            </a>
                            <ul className="data_guns">
                                <li>
                                    <span className="icon_item_type">🥆</span>
                                    <span className="name_gun">{skin.name}</span>
                                </li>
                                <li>

                                    <span className="quality_gun">{skin.quality}</span>
                                </li>
                                <li>

                                    <span className="raritet_gun">{skin.item_type}</span>
                                </li>

                                <li>
                                    <a style={{color: shops_name[skin.id_shop - 1]['color']}}
                                       className="shop_name"
                                       target="_blank"
                                        rel="noreferrer noopener"
                                       href={shops_name[skin.id_shop - 1]['href']}
                                    >
                                        {shops_name[skin.id_shop - 1]['name']}
                                    </a>
                                </li>
                            </ul>
                        </div>

                    )
            }
        )
    )
}
