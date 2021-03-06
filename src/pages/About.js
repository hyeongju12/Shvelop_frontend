import React from 'react'
import LogoBox from "../components/Logo/LogoBox";
import SearchBox from "../components/Box/SearchBox";
import AccountMenu from "../components/Menu/AccountMenu";
import AboutProfileContainer from "../components/About/AboutProfileContainer";
import AboutPostContainer from "../components/About/AboutPostContainer";


function About() {

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
            <div>
                <AboutProfileContainer />
                <AboutPostContainer/>
            </div>
        </div>
    )
}

export default About