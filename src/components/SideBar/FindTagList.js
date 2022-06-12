import List from "@mui/material/List";
import * as React from "react";
import TagItem from "./FindTagItem";

export default function FindTagList() {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <TagItem/>
            <TagItem/>
            <TagItem/>
            <TagItem/>
            <TagItem/>
        </List>
    )
}