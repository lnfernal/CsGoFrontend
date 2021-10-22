import React from 'react'
import {Link} from "react-router-dom";

export const StoresCards = ({shops}) => {
    if (!shops.length) {
        return <p className="center">Нет информации о магазинах</p>
    }
    return (
        shops.map((shop) => {
                return (
                    <div className="stores_item" key={shop._id}>
                        <div className="card_img_place">
                            <img
                                src={shop.img}
                                alt={shop.name}
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
                        <Link className="stores_btn about_site" to={`/store/${shop.id}`}>О сайте</Link>
                    </div>
                )
            }
        ))
}