import React from "react";
import "./CommentList.css";
import {Divider, InputAdornment, Paper, TextField} from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {useState} from "react";
import {useAppContext} from "../../store";
import Axios from "axios";
import Button from "@mui/material/Button";


export default function InputComment({post}) {

    const { store: { jwtToken } } = useAppContext();
    const [comment, setComment] = useState('')
    const onChangeComment = (e) => { setComment(e.target.value) }
    console.log(comment)

    const onSubmit = async () => {
        const apiUrl = `http://127.0.0.1:8000/api/posts/${post.id}/comments/`;
        const headers = { Authorization: `JWT ${jwtToken}`};

        try {
            const response = await Axios.post(apiUrl, {message: comment}, {headers})
            console.log('comment : ', response)
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <Paper style={{ padding: "20px 20px", marginTop: 5}}>
            <form onSubmit={onSubmit}>
                <TextField
                    id="outlined-content-input"
                    label="Comment"
                    type="comment"
                    name="comment"
                    onChange={onChangeComment}
                    placeholder="Comment..."
                    rows={3}
                    multiline
                    sx={{ width: '100%', height: '40%', marginBottom: 1}}
                    InputProps={{
                        startAdornment : (
                            <InputAdornment position="start">
                                <TextSnippetIcon/>
                                <Divider orientation="vertical"/>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    type="submit"
                    value="submit"
                    variant="contained"
                    disabled={comment.length === 0}
                    sx={{width: '100%', align: 'center'}}
                >
                    Submit
                </Button>
            </form>
        </Paper>
    );
}
