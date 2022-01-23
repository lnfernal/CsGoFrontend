import React from 'react'

export const ArrowForTopScroll = () => {
    const scrollToTop = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div className="top_arrow_place" onClick={scrollToTop}>
            <span className="fas fa-arrow-up">

            </span>
        </div>
    )
}