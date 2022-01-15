import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from './routes.js'
import {Utilites} from "./pages/utilites";
import {useAuth} from './hooks/auth_hook'
import {AuthContext} from './context/AuthContext'

function App() {
    const {token, login, logout, userId, userSubscribe} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)
    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, userSubscribe, isAuthenticated
        }}>
            <Router>
                <Utilites/>
                {routes}
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
