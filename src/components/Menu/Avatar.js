import {useAppContext} from "store";
import * as React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function LoginAvatar() {
    const {store: {isAuthenticated}} = useAppContext()


    if (!isAuthenticated) {
        return (
            <AccountCircleIcon sx={{ width: 40, height: 40}} color={"disabled"}/>
        )
    }
    return (
        <AccountCircleIcon sx={{ width: 40, height: 40}} color={"success"}/>
    )
}