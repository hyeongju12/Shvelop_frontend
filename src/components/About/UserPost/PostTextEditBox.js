import {Stack, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import {axiosInstance} from "api";
import {useHistory} from "react-router-dom";
import {useAppContext} from "store";

export default function PostTextEditBox({post}) {
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const history = useHistory()

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');


    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    /////////////////////////////////////////////////////////////////////////////

    const onUpdateSubmit = (e) => {
        e.preventDefault()
        let editFormData = new FormData();
        editFormData.append("title", title)
        editFormData.append("category", category)
        editFormData.append("content", content)
        axiosInstance.patch(`/api/user/posts/${post.id}/edit/`, editFormData, {headers})
            .then(response => {
                history.go()
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
    };
    /////////////////////////////////////////////////////////////////////////////
    return (
        <form onSubmit={onUpdateSubmit}>
            <Stack justifyContent='space-evenly' direction={'column'} alignItems='center' sx={{width: '100%'}}>
                <TextField
                    id="title"
                    label="Title"
                    defaultValue={post.title}
                    size='medium'
                    fullWidth={true}
                    name="title"
                    sx={{backgroundColor: 'white', marginBottom: 1, marginTop: 1}}
                    onChange={handleTitleChange}
                />
                <TextField
                    id="category"
                    label="Category"
                    defaultValue={post.category}
                    size='small'
                    fullWidth={true}
                    name="category"
                    sx={{backgroundColor: 'white', marginBottom: 1}}
                    onChange={handleCategoryChange}
                />
                <TextField
                    id="content"
                    label="Content"
                    multiline
                    rows={8}
                    defaultValue={post.content}
                    fullWidth={true}
                    name="content"
                    sx={{backgroundColor: 'white', marginBottom: 0.1}}
                    onChange={handleContentChange}
                />
                <Stack direction='row' spacing={1} sx={{width: '100%'}} justifyContent={"space-evenly"}>
                    <Button
                        onClick={onUpdateSubmit}
                        type='submit'
                        variant="contained"
                        component="span"
                        style={{width: '100%', marginTop: 5}}>
                        텍스트 수정
                    </Button>
                </Stack>
            </Stack>
        </form>
    )
}
