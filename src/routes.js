import React from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'
import {Index} from './pages/Index'
import {Shops} from './pages/Shops'
import {Subscribe} from './pages/Subscribe'
import {Shop} from './pages/Shop'
import {Cabinet} from './pages/Cabinet'
import {Faq} from "./pages/Faq";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/main' exact>
                    <Index/>
                </Route>
                <Route path='/stores' exact>
                    <Shops/>
                </Route>
                <Route path='/faq' exact>
                    <Faq/>
                </Route>
                <Route path="/store/:id">
                    <Shop/>
                </Route>
                <Route path='/subscribe' exact>
                    <Subscribe/>
                </Route>
                <Route path='/cabinet' exact>
                    <Cabinet/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path='/main' exact>
                <Index/>
            </Route>
            <Route path='/stores' exact>
                <Shops/>
            </Route>
            <Route path='/faq' exact>
                <Faq/>
            </Route>
            <Route path="/store/:id">
                <Shop/>
            </Route>
            <Route path='/subscribe' exact>
                <Subscribe/>
            </Route>
        </Switch>
    )
}