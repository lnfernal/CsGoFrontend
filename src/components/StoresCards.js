import React from 'react'

export const StoresCards = ({shops}) => {
    if (!shops.length) {
        return <p className="center">Скинов пока нет</p>
    }
    return (
        shops.map((shop) => {
                return (
                    <div className="stores_item" key={shop._id}>
                        <div className="card_img_place">
                            <img
                                src={shop.img}
                                className="card_img"
                            />
                        </div>
                        <div className="razdelitel">

                        </div>
                        <a className="stores_name_stores" href={shop.ref_href}>
                            {shop.name}
                        </a>
                        <div className="razdelitel">

                        </div>
                        <a className="stores_btn registr" href={shop.ref_href} target="_blank" rel="noreferrer noopener ">
                            Зарегистрироваться
                        </a>
                        <a className="stores_btn about_site" href={`/store/${shop.id}`}>О сайте</a>
                    </div>
                )
            }
        ))
}