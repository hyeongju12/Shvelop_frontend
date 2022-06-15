import {Stack} from "@mui/material";
import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {axiosInstance} from "api";
import {useHistory} from "react-router-dom";
import {useAppContext} from "store";
import Chip from "@mui/material/Chip";
import {API_HOST} from "Constants";
import PostCoverImageEditBox from "./PostCoverImageEditBox";
import PostTextEditBox from "./PostTextEditBox";
import PostFileEditBox from "./PostFileEditBox";

export default function UserPostCard({post}) {
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const history = useHistory()


    /////////////////////////////////////////////////////////////////////////////
    const onHandleDelete = (e) => {
        axiosInstance.delete(`/api/user/posts/${post.id}/delete/`, {headers})
            .then(response => {
                history.go()

            })
            .catch(error => {
                console.log(error.response)
            })
    }
    /////////////////////////////////////////////////////////////////////////////
    return (
        <Card sx={{ maxWidth: "100%", height: '550px', backgroundColor: '#fafafa', border: '1px solid #fafafa'}}>
            <Stack direction={"row"} justifyContent='flex-start' alignItems='center' spacing={1}
                   marginTop={2}
                   marginLeft={4} marginBottom={-6}>
                <Chip label={'Post '+post.id} />
                <Chip label={'CREATE_AT : ' + post.created_at.toLocaleString().slice(0,10) + ' ' + post.created_at.toLocaleString().slice(11, 16)} />
                <Chip label={'UPDATED_AT : ' +post.updated_at.toLocaleString().slice(0,10) + ' ' + post.updated_at.toLocaleString().slice(11, 16)} />
            </Stack>

            <Stack sx={{height: '100%', width: 900}} direction='row' justifyContent='space-around' spacing={2} alignItems='center'>
                <Stack sx={{width: '40%', height: '87%', marginTop: 6}} justifyContent='space-evenly' direction='column' spacing={1}>
                    <Box sx={{width: '100%', height: '80%', border: '1px solid lightgray', marginLeft: 2}}>
                        <img src={API_HOST+post.cover_img} style={{width: '100%', height: 400}} alt="CoverImage"/>
                    </Box>
                    <Stack sx={{height: '100%', width: "40%"}} direction='row' justifyContent='space-around' spacing={2} alignItems='center'>
                        <PostCoverImageEditBox post={post}/>
                    </Stack>
                </Stack>

                <Stack sx={{width: '55%', marginRight: 2,height: '80%'}} spacing={1}>
                    <PostTextEditBox post={post}/>
                    <Stack direction='row' spacing={1} justifyContent={"space-evenly"}>
                        <PostFileEditBox post={post}/>
                        <Button variant="outlined" component="span" style={{width: '100%', marginTop: 3, backgroundColor: 'white', }}>
                            <a href={post.attached_file} target='_blank' without="true" rel="noreferrer" download>파일 다운로드</a>
                        </Button>
                    </Stack>
                    <Stack direction='row' spacing={1} justifyContent={"space-evenly"}>
                        <Button
                            onClick={onHandleDelete}
                            variant="contained"
                            color='error'
                            component="span"
                            style={{width: '100%', marginTop: 5}}>
                            포스트 삭제
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}
