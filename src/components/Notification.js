import React from 'react'
const Notification = ({setActive, active, status, message}) => {
    console.log("Дошло!")
    return (
        <div className={status === 1 && active ? "notification _active error" : "notification _active success"}>
            <div className="notification_heading">
                {status === 1 ? "Успешно!" : "Ошибка"}
            </div>
            <div className="notification_message">
                {message}
            </div>
        </div>
    )
}
export default Notification