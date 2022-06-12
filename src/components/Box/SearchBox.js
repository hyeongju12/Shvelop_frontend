import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import {Divider} from "@mui/material";
import {useState} from "react";

export default function SearchBox() {
    const [input, SetInput] = useState('')

    const onChange = (e) => {
        const {value, string} = e.target
        SetInput(prev => ({
            ...input,
            [value] : string,
        }))
    }

    return (
        <Paper
            component="form"
            sx={{ flex: 3, p: '2px 4px', display: 'flex', alignSelf: 'center', width: 570 }}
        >
            <InputBase
                sx={{ ml: 2, flex: 1 }}
                placeholder=""
                hidden
                inputProps={{ 'aria-label': 'search' }}
                onChange={onChange}
                disabled={true}
            />
            <Divider sx={{ height: 35, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: '10px'}} aria-label="search">
                <SearchOutlinedIcon/>
            </IconButton>
        </Paper>
    );
}
