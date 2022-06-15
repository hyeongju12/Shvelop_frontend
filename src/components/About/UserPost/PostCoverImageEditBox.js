import {Stack} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import {axiosInstance} from "api";
import {useHistory} from "react-router-dom";
import {useAppContext} from "store";
import Box from "@mui/material/Box";

export default function PostCoverImageEditBox({post}) {

    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const history = useHistory()

    const [coverImage, setCoverImage] = useState(post.cover_img);

    const onImageChange = async (e) => {
        await setCoverImage(e.target.files[0]);
    };
    /////////////////////////////////////////////////////////////////////////////

    const onImageSubmit = (e) => {
        e.preventDefault()
        let editFormData = new FormData();
        editFormData.append("cover_img", coverImage)

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
        <form onSubmit={onImageSubmit}>
            <Stack sx={{marginLeft: 13.5,width: '100%', height: '80%'}} justifyContent='space-evenly' direction='column' spacing={3}>
                <label htmlFor="contained-button-file">
                    <Box>
                        <input type="file" multiple onChange={onImageChange} style={{marginBottom: 10, marginLeft: 20}}/>
                    </Box>

                    <Button variant="contained" component="span" name="coverImage" sx={{marginLeft: 2}} style={{width: '100%'}} onClick={onImageSubmit}>
                        이미지 submit
                    </Button>
                </label>
            </Stack>
        </form>
    )
}
