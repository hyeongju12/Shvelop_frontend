import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import {Divider} from "@mui/material";
import TagIcon from '@mui/icons-material/Tag';

export default function FindTagBox() {

    return (
        <Paper
            component="form"
            sx={{ flex: 3, display: 'flex', alignSelf: 'right', width: 284}}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder="Find Tag"
                inputProps={{ 'aria-label': 'search' }}
            />
            <Divider sx={{ height: 35, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: '10px'}} aria-label="search">
                <TagIcon
                    color="disabled"
                    fontSize="medium"
                />
            </IconButton>
        </Paper>
    );
}
