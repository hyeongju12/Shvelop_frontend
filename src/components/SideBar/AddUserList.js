import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {CircularProgress, ListItemButton} from "@mui/material";
import {useAppContext} from "../../store";
import Divider from '@mui/material/Divider';
import AddUserItem from "./AddUserItem";
import {useEffect, useState} from "react";
import {axiosInstance, useAxios} from "api";
import NotiAlert from "./NotiAlert";
import {useHistory} from "react-router-dom";

export default function AddUserList() {
    const history = useHistory()
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const [userList, setUserList] = useState([])
    const apiUrl = "/accounts/suggestions/"
    const [{data : originUserDataList, loading, error}, refetch] = useAxios({
        url: apiUrl,
        headers,
    })

    useEffect(() => {
        if (!originUserDataList) setUserList([]);
        else
            setUserList(originUserDataList.map(user=> ({
            ...user, is_follow: false
        })))
    }, [originUserDataList])
    const onFollowUser = username => {
        const data = {username}
        const config = {headers}
        axiosInstance.post("/accounts/follow/", data, config)
            .then(response => {
                setUserList(prevUserList => {
                    return prevUserList.map(user => {
                        if (user.username === username) {
                            return {...user, is_follow: true}
                        } else return user
                    })
                })
                history.go()
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }
    const unFollowUser = username => {
        const data = {username}
        const config = {headers}
        axiosInstance.post("/accounts/unfollow/", data, config)
            .then(response => {
                setUserList(prevUserList => {
                    return prevUserList.map(user => {
                        if (user.username === username) {
                            return {...user, is_follow: false}
                        } else return user
                    })
                })
                history.go()
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {loading && <CircularProgress sx={{marginLeft: 17}}/>}
            {error && <NotiAlert />}
            {userList && userList.map(userData => (
                <AddUserItem userDataList={userData} key={userData.username} onFollowUser={onFollowUser} unFollowUser={unFollowUser}/>
                ))}

            <Divider/>
            <ListItemButton sx={{marginTop: '5px'}} onClick={() => refetch()}>
                <ListItemText primary="Refresh" sx={{textAlign: 'center', border: '0.5px solid lightgray'}}/>
            </ListItemButton>
        </List>
    )
}