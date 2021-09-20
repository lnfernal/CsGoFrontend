import React from 'react'
const Notification = ({active, setActive, status, message}) => {
    return (
        <div className={status === 1 && active ? "notification _active error" : "notification _active success"}>
            <div className="notification_heading">
                Ошибка!
            </div>
            <div className="notification_message">
                {message}
            </div>
        </div>
    )
}
export default Notification