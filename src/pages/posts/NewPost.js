import React from 'react'
import LogoBox from "../../components/Logo/LogoBox";
import SearchBox from "../../components/Box/SearchBox";
import AccountMenu from "../../components/Menu/AccountMenu";
import PostNewForm from "../../components/Form/PostNewForm";

export default function NewPost() {

    return (
        <div className="app">
            {/* Start Header */}
            <div className="header">
                <div className="logo">
                    <LogoBox/>
                </div>
                <div className="search-bar">
                    <SearchBox/>
                </div>
                <div className="top-nav-bar">
                    <AccountMenu />
                </div>
            </div>
            {/* End Header */}

            <div className="post_form">
                <PostNewForm />
            </div>


        </div>
    )
}