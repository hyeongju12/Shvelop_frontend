import React from "react";
import {Route} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function Routes({match}) {
    return (
        <>
            <Route exact path={match.url + "/login"} component={Login}/>
            <Route exact path={match.url + "/signup"} component={Signup}/>
        </>
    )
}

export default Routes
