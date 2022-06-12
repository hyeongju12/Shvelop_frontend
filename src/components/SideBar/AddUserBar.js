import * as React from 'react';
import Card from "@mui/material/Card";
import AddUserList from "./AddUserList";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {Divider} from "@mui/material";

export default function AddUserBar() {
    return (
        <Card sx={{
            marginBottom: 2,
            marginRight: 2,
            border: '1px solid gray'
        }}>
            <CardContent sx={{marginBottom: -2}}>
                <Typography gutterBottom variant="h6" component="div">
                    친구 추천
                </Typography>
            </CardContent>
            <Divider/>
            <AddUserList />
        </Card>
    );
}

