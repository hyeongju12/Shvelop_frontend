import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Paper} from "@mui/material";
import ImageEditBox from "./Edit/ImageEditBox";
import ProfileEditBox from "./Edit/ProfileEditBox";

export default function AboutProfileContainer({userInfo, profileInfo}) {
    return (
        <Container>
            <h2 style={{marginLeft: 25}}>개인설정</h2>

            <Box sx={{
                bgcolor: '#f5f5f5',
                height: '400px',
                width: '970px',
                display: 'flex',
            }}>

                <Paper sx={{width: '300px'}} square>
                    <ImageEditBox userinf={userInfo}/>
                </Paper>
                <Paper sx={{width: '650px', marginLeft: '15px'}} square>
                    <ProfileEditBox profile={profileInfo}/>
                </Paper>
            </Box>
        </Container>
    );
}
