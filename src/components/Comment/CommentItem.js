import {Grid, Paper} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import React from "react";

export default function CommentItem({comment}) {
    return (
        <Paper
            style={{ padding: "20px 20px", border : '1px solid light gray', marginBottom : 10}}
        >
            <Grid container wrap="nowrap" spacing={2} marginBottom={1}>
                <Grid item>
                    <Avatar alt={comment.author.username} src={comment.author.avatar_url}
                            style={{
                                width: "50px",
                                height: "50px",
                                border: '0.1px solid lightgray'
                            }}/>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth marginBottom={-2}>
                    <h3 style={{ margin: 0, textAlign: "left" }}>{comment.author.username}</h3>
                    <p style={{ textAlign: "left", fontSize: '20px' }}>
                        {comment.message}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {comment.created_at.toLocaleString().slice(0,10) + ' ' + comment.created_at.toLocaleString().slice(11, 16)}
                    </p>
                </Grid>
            </Grid>
        </Paper>
    )
}
