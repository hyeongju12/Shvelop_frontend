import * as React from 'react';
import Chip from '@mui/material/Chip';
import {useEffect, useState} from "react";

export default function ChipsArray({post}) {

    const [tags, setTags] = useState(post)
    useEffect(()=> {
        setTags(post)
    }, [post])

    const handleClick = () => {
        console.info('You clicked the Tag.');
    };

    const tag_set = tags.post_tag_set
    const string_to_array = tag_set.replace(/ /g, '').replace(/\[/, '').replace(/\]/, '').split(',')
    const tag_set_array = string_to_array.map(tag => tag.slice(5, -1))


    return (
        tag_set_array.map((data) => {

            if (data!=='') {
                return (
                    <Chip
                        label={data}
                        onClick={handleClick}
                        key={data}
                        sx={{fontSize: '15px',marginLeft: 1 ,marginRight: 1, marginTop: 1}}
                    />
                );
            }
            else {
                return (
                    <Chip
                        label="전체"
                        onClick={handleClick}
                        key={data}
                        sx={{fontSize: '15px',marginLeft: 1 ,marginRight: 1, marginTop: 1}}
                    />                )
            }
        })
    );
}
