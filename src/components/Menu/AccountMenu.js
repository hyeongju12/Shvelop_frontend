import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {Button} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";
import {Link} from "react-router-dom"
import {deleteToken, useAppContext} from "store";
import LoginAvatar from "./Avatar";


export default function AccountMenu() {
    const {store: {isAuthenticated}} = useAppContext()
    const {store: {jwtToken}} = useAppContext()
    const {dispatch} = useAppContext()
    const [anchorEl, setAnchorEl] = useState(null);


    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logoutClick = () => {
            dispatch(deleteToken(jwtToken))
    };


    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginLeft:3
                ,'& button': { m: 1 }}}>
                <Button variant="contained" size="large"  component={Link} to={"/posts/new"}>
                    New Post
                </Button>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <LoginAvatar/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem component={Link} to={"/accounts/signup"} disabled={isAuthenticated}>
                    <ListItemIcon>
                        <AddIcon fontSize="small" />
                    </ListItemIcon>
                    Create Account
                </MenuItem>
                <MenuItem component={Link} to={"/accounts/login"} disabled={isAuthenticated}>
                    <ListItemIcon>
                        <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    Login
                </MenuItem>

                <MenuItem component={Link} to={"/About"} disabled={!isAuthenticated}>
                    <ListItemIcon>
                        <ManageAccountsIcon fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>

                <MenuItem disabled={!isAuthenticated} onClick={logoutClick}>
                    <ListItemIcon >
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
