import "./CommentList.css";
import {useAppContext} from "../../store";
import CommentItem from "./CommentItem";
import {useAxios} from 'api'


export default function CommentList({post}) {
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const [{data : commentList, loading, error}] = useAxios({
        url: `/api/posts/${post.id}/comments/`,
        headers,
    })

    return (
        <>
                {loading && <div>로딩중</div>}
                {error && <div>{error}</div>}
                {commentList&&commentList.map(comment =>
                    <CommentItem comment={comment} key={comment.id}/>
                )}
        </>
    )

}
