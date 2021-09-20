import React from 'react'

import {Switch, Route} from 'react-router-dom'
import {Index} from './pages/Index'
import {Shops} from './pages/Shops'
import {Subscribe} from './pages/Subscribe'
import {Shop} from './pages/Shop'
import {Cabinet} from './pages/Cabinet'
import {Faq} from "./pages/Faq";

export const useRoutes = () => {

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
            <Route path="/store/:shop_id">
                <Shop/>
            </Route>
            <Route path='/subscribe' exact>
                <Subscribe/>
            </Route>
            <Route path='/cabinet' exact>
                <Cabinet/>
            </Route>
        </Switch>
    )
}