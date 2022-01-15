import React from 'react'

const Notification = ({setActive, active, status, message}) => {
    setTimeout(() => setActive(false), 2500)
        return (
            <div className={active ? "notification _active" : "notification _active"}>
                <div className={status === 2 ? "notification_heading error" : "notification_heading success"}>
                    {status === 2 ? "Ошибка!" : "Успешно!"}
                </div>
                <div className="notification_message">
                    {message}
                </div>
            </div>
        )


}
export default Notification