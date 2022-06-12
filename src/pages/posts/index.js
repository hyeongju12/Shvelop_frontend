import React from "react";
// import {Route} from "react-router-dom";
import NewPost from "./NewPost";
import LoginRequiredRoute from "../../utils/LoginRequiredRoute";

function Routes({match}) {
    return (
        <>
            <LoginRequiredRoute exact path={match.url + "/new"} component={NewPost}/>
        </>
    )
}

export default Routes
