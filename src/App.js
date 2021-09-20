import React from 'react'
import {BrowserRouter as Router} from "react-router-dom"
import {useRoutes} from './routes.js'
import {Utilites} from "./pages/utilites";

function App() {
    const routes = useRoutes()
    return (
        <Router>
            <div className="container">
                <h1>{routes}</h1>
            </div>
            <Utilites/>
        </Router>
    );
}

export default App;
