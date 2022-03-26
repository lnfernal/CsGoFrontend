import React from 'react'


export const Stickers = ({sticker = {}}) => {
    // tippy('.sticker_img_place', {
    //     placement: 'left',
    //     animation: 'scale',
    //     arrows: true,
    //     size: 'small',
    //     distance: 30
    // });

    return (
        <div className="sticker_img_place">
        {sticker && sticker.hasOwnProperty("image") &&
            <img
                    src={sticker.image}
                    alt={sticker.name}
                    className="sticker_img"
                />
            }
            {sticker && sticker.hasOwnProperty("link") &&
                <img
                    src={sticker.link}
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
            {sticker && sticker.hasOwnProperty("sticker_img") &&
                <img
                    src={sticker.sticker_img}
                    alt={sticker.sticker_title}
                    className="sticker_img"
                />
            }
        </div>
    )
}