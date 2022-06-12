import React, {useEffect, useState} from 'react';
import PostCard from "components/Post/PostCard";
import {useAppContext} from "store";
import NoListAlert from "./PostListAlert";
import {CircularProgress} from "@mui/material";
import Button from "@mui/material/Button";
import {axiosInstance, useAxios} from "api";
import NotiAlert from "../SideBar/NotiAlert";


function PostList() {
    const [postList, setPostList] = useState([])
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const apiUrl = "/api/posts/"
    const [{data : Posts, loading, error}, refetch] = useAxios({
        url: apiUrl,
        headers,
    })


    const handleLike = async ({post, isLike}) => {
        const apiUrl = `/api/posts/${post.id}/like/`;
        const method = isLike ? "POST" : "DELETE";
        try {
            const response = await axiosInstance({
                url : apiUrl,
                method,
                headers,
            })
            console.log("is_like : ",response)

            setPostList(prevList => {
                return prevList.map(currentPost =>
                    currentPost === post
                    ? {...currentPost, is_like: isLike}
                        : currentPost
                )
            })

        } catch (error) {
            console.log("is_like error : ", error)
        }
    }

    useEffect(() => {
        if (!Posts) setPostList([])
        else
            setPostList(Posts)
    }, [Posts])

    return (
    <div className="post_list">
        <Button variant="contained" sx={{marginLeft: 2, marginBottom: 1, width: 650}} onClick={()=> {refetch()}}>Reload</Button>
        {postList && postList.length === 0 && (
            <NoListAlert/>
        )}
        {loading&& <CircularProgress sx={{marginLeft: 40}}/>}
            {error && <NotiAlert/>}
            {postList.map((post) => {
                return <PostCard post={post} key={post.id} handleLike={handleLike}/>
                }
            )}
        </div>
    )
}

export default PostList