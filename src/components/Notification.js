import React from 'react'
const Notification = ({status, message}) => {
    return (
        <div className={status === 1 ? "notification _active error" : "notification _active success"}>
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