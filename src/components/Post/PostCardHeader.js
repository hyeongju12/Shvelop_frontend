import {CardHeader} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import * as React from "react";

export default function PostCardHeader({post}) {
    const { id, title, created_at } = post
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    return (
        <>
            <CardHeader
                avatar={
                    <Tooltip title="Account">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{}}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar alt={post.author.username} src={post.author.avatar_url}
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        border: '0.1px solid lightgray'
                                    }}/>

                        </IconButton>
                    </Tooltip>
                }
                title={title}
                key={id}
                titleTypographyProps={{variant:'h5', marginLeft: -1, marginBottom: 0.2, fontFamily: 'Arial'}}
                subheader={created_at.toLocaleString().slice(0,10) + ' ' + created_at.toLocaleString().slice(11, 16)}
                subheaderTypographyProps={{fontSize: '15px'}}
            />
        </>
    )
}

