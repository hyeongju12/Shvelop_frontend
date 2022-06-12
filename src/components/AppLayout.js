import React from 'react';
import './AppLayout.scss';
import AccountMenu from "./Menu/AccountMenu";
import PostList from "./Post/PostList";
import SearchBox from "./Box/SearchBox";
import LogoBox from "./Logo/LogoBox";
import AddUserBar from "./SideBar/AddUserBar";
import FollowingUserBar from "./SideBar/FollowingUserBar";

function AppLayout() {
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
                    <AccountMenu/>
                </div>
            </div>
            {/* End Header */}

            {/* Start Contents */}
            <div className="contents">
                <PostList />
            </div>
            {/* End Contents */}

            {/* Start SideBar */}
            <div className="sidebar">
                <div className="story-list">
                    <AddUserBar/>
                </div>
                <div className="story-list">
                    <FollowingUserBar/>
                </div>
            </div>
            {/* End SideBar */}
        </div>
    )
}

export default AppLayout