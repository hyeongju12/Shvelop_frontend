import {CircularProgress, Stack} from "@mui/material";
import * as React from "react";
import UserPostCard from "./PostCard";
import {useEffect, useState} from "react";
import {useAppContext} from "store";
import {useAxios} from "api";
import ProfileAlter from "./ProfileAlter";
import NoListAlert from "../../Post/PostListAlert";

export default function UserPostList() {
    const [userPostList, setUserPostList] = useState([])
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const apiUrl = "/api/user/posts/"
    const [{data : Posts, loading, error}] = useAxios({
        url: apiUrl,
        headers,
    })

    useEffect(() => {
        if (!Posts) setUserPostList([])
        else
            setUserPostList(Posts)
    }, [Posts])


    return (
        <Stack sx={{height: '100%', width: '100%'}} direction='column' spacing={2} justifyContent="space-evenly" alignItems='center'>
            {userPostList && userPostList.length === 0 && (
                <NoListAlert/>
            )}
            {loading&& <CircularProgress sx={{marginLeft: 40}}/>}
            {error && <ProfileAlter/>}
            {userPostList.map((post) => {
                return <UserPostCard post={post} key={post.id}/>
            })}
        </Stack>
    )
}
