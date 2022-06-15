import {Paper, Stack, styled} from "@mui/material";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import {useEffect, useState} from "react";
import {axiosInstance} from "api";
import {deleteToken, useAppContext} from "store";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";



export default function ImageEditBox() {
    const Input = styled('input')({
        display: 'none',
    });
    const history = useHistory();
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const [userInfo, setUserInfo ]= useState([])
    const userApiUrl = "/accounts/user/"
    const Userhandler = async () => {
        await axiosInstance.get(userApiUrl, {headers})
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        Userhandler()
    }, [setUserInfo])
    ///////////////////////////////////////////////////////////////////////////////
    const [avatarImage, setAvatarImage] = useState()
    const handleFileUpload = async(e) => {
        await setAvatarImage(e.target.files[0]);
    };

    const onSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("avatar", avatarImage)

        axiosInstance.patch("/accounts/user/", formData, {headers})
            .then(response => {
                history.go()
                console.log(response['status'])
            })
            .catch(error => {
                console.log(error.response)
            })
    };


    return (
        <>
            <Stack sx={{height: '100%', width: '100%'}} direction='column' spacing={2} justifyContent="space-evenly" alignItems='center'>
                <Paper sx={{width: '95%', height: '70%', justifyContent: 'center'}} square>
                    <Avatar
                        alt="Remy Sharp"
                        src={userInfo.avatar_url}
                        sx={{ marginTop: 6, marginLeft: 6.5, width: 180, height: 210, border: '1px solid lightgray'}}
                    />
                </Paper>
                <Paper sx={{width: '95%', height: '20%', justifyContent: 'center'}}  square>
                    <form onSubmit={onSubmit}>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-evenly"
                            spacing={1}
                            marginTop={1.5}
                        >
                            <label htmlFor="contained-button-file">
                                <Input
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple type="file"
                                    name="avatarImage"
                                    onChange={handleFileUpload}
                                />
                                <Button sx={{width: 120, height: 50}} variant="contained" component="span">
                                    사진 업로드
                                </Button>
                            </label>
                            <Button
                                sx={{width: 120, height: 50}}
                                variant="contained"
                                color="success"
                                component="span"
                                type="submit"
                                value="submit"
                                onClick={onSubmit}
                            >
                                사진 변경
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </Stack>
        </>
    )
}
