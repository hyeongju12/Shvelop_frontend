import * as React from 'react';
import Card from "@mui/material/Card";
import FollowingUserList from "./FollowingUserList";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function FollowingUserBar() {
    return (
        <Card sx={{
            marginBottom: 2,
            marginRight: 2,
            border: '1px solid gray'
        }}>
            <CardContent sx={{marginBottom: -2}}>
                <Typography gutterBottom variant="h6" component="div">
                    친구 목록
                </Typography>
            </CardContent>
            <Divider/>
            <FollowingUserList />
        </Card>
    );
}

