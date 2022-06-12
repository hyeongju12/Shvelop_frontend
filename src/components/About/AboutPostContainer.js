import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Paper} from "@mui/material";
import UserPostList from "./UserPost/UserPostList";

export default function AboutPostContainer() {
    return (
        <Container sx={{marginBottom: 4, marginTop: 3}}>
            <Box sx={{
                bgcolor: 'white',
                height: '100%',
                width: '970px',
                display: 'flex',
                flexWrap: 'wrap',
            }}>
                <h2 style={{marginLeft: 25}}>포스트 수정</h2>
                <Paper sx={{width: '970px'}} variant="outlined" square>
                    <UserPostList/>
                </Paper>
            </Box>
        </Container>
    );
}
