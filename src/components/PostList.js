import React, {useEffect, useState} from 'react';
import axios from "axios";
import Post from "components/Post";

const apiUrl = "http://localhost:8000/api/post/"

function PostList() {
    const [postList, setPostList] = useState([])

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                const {data} = response
                console.log("loaded response : ", response)
                setPostList(data)
            })
            .catch(error => {

            })
    }, [])
    return (
        <div>
            PostList
            {postList.map((post) => {
                return <Post post={post}key={post.id}/>
                }
            )}
        </div>
    )
}

export default PostList