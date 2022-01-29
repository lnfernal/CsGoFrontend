import React from 'react'


export const Stickers = ({skin, sticker = {}}) => {
    return (
        <div className="sticker_img_place" key={`sticker-${skin.id}`}>
            {sticker && sticker.hasOwnProperty("image") &&
                <img
                    src={sticker.image}
                    alt={sticker.name}
                    className="sticker_img"
                />
            }
            {sticker && sticker.hasOwnProperty("img") &&
                <img
                    src={sticker.img}
                    alt={sticker.name}
                    className="sticker_img"
                />
            }
            {sticker && sticker.hasOwnProperty("imageUrl") &&
                <img
                    src={sticker.imageUrl}
                    alt={sticker.localizedName}
                    className="sticker_img"
                />
            }
            {sticker && sticker.hasOwnProperty("4") &&
                <img
                    src={'https://cs.deals/steamImages/' + sticker['4']}
                    alt={sticker['0']}
                    className="sticker_img"
                />
            }
        </div>
    )
}