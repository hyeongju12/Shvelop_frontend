import * as React from 'react';
import Card from "@mui/material/Card";
import {Divider,} from "@mui/material";
import FindTagList from "./FindTagList";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function FindTagBar() {
    return (
        <Card sx={{
            marginBottom: 2,
            marginRight: 2,
            border: '1px solid gray'
        }}>
            <CardContent sx={{marginBottom: -2}}>
                <Typography gutterBottom variant="h6" component="div">
                    # TOP 5 태그
                </Typography>
            </CardContent>
            <Divider/>
            <FindTagList />
        </Card>
    );
}

