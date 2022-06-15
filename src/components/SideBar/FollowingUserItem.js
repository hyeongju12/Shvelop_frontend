import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {Grid, Modal, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import ListItem from "@mui/material/ListItem";
import {useState} from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function FollowingUserItem({userDataList, onFollowUser, unFollowUser}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {username, profile, avatar_url, is_follow, email} = userDataList

    return (
        <>
            <ListItem alignItems="flex-start" key={username}>
                <ListItemAvatar>
                    <IconButton onClick={handleOpen}>
                        <Avatar alt={username} src={avatar_url} style={{
                            margin: "5px",
                            marginRight: "10px",
                            width: "40px",
                            height: "40px",
                            border: '0.1px solid lightgray'
                        }}/>
                    </IconButton>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modal_style} >
                            <Stack spacing={2}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4}>
                                        <Avatar alt={username} src={avatar_url} style={{
                                            width: "120px",
                                            height: "120px",
                                            border: '0.1px solid lightgray'
                                        }}/>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            ID : {username}
                                        </Typography>
                                        <Typography id="modal-modal-title" variant="body2" component="h6">
                                            email : {email}
                                        </Typography>
                                        <Typography id="modal-modal-description" variant="body2" sx={{ mt: 2 }}>
                                            자기소개 <br/>
                                           Skill : {profile.skill_set}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                {is_follow &&
                                    < Button variant="contained" color="error" disableElevation xs={{width: '100%'}} onClick={()=>unFollowUser(username)}>
                                        Unfollow
                                    </Button>
                                }
                                {!is_follow &&
                                    <Button variant="contained" disableElevation xs={{width: '100%'}} onClick={()=>onFollowUser(username)}>
                                        Follow
                                    </Button>
                                }
                            </Stack>
                        </Box>
                    </Modal>
                </ListItemAvatar>

                <ListItemText
                    primary={username}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {profile.bio}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider/>
        </>
    )
}