import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [subscriber, setSubscribe] = useState(null)
    const login = useCallback((jwtToken, id, subscribe) => {
        setToken(jwtToken)
        setUserId(id)
        setSubscribe(subscribe)
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, userSubscribe: subscribe
        }))
    }, [])


    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setSubscribe(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        console.log('data_hook', data)
        if (data && data.token) {
            login(data.token, data.userId, data.subscribe)
        }
        setReady(true)
    }, [login])


    return {login, logout, token, userId, ready, subscriber}
}