import React from 'react';
import {Route} from 'react-router-dom';
import About from './About';
import Home from "./Home";
import AccountRoutes from "./accounts";
import PostRoutes from "./posts";
import LoginRequiredRoute from "../utils/LoginRequiredRoute";

function Root() {
    return (
        <>
            <Route exact path="/" component={Home}/>
            <LoginRequiredRoute exact path="/about" component={About}/>
            <Route path="/posts" component={PostRoutes}/>
            <Route path="/accounts" component={AccountRoutes} />
        </>

    )
}

export default Root