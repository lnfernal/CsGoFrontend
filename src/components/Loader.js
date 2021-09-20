import React from 'react'
export const Loader = () => {
    return (
        <div className="preloader">
            <div className="preloader_text">
                <span id="message_for_empty">
                </span>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}
