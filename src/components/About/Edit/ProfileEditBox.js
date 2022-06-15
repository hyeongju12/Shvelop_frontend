import {Stack, TextField} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import {deleteToken, useAppContext} from "store";
import {axiosInstance} from "api";
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function ProfileEditBox() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const history = useHistory()
    const {dispatch} = useAppContext()
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const [profileInfo, setProfileInfo]= useState([])
    const profileApiUrl = "/accounts/profile/"
    const Profilehandler = async () => {
        await axiosInstance.get(profileApiUrl, {headers})
            .then(response => {
                setProfileInfo(response.data);
            })
            .catch(error => {

            })
    }
    useEffect(() => {
        Profilehandler()
    }, []);


    const [bio, setBio] = useState('')
    const [skill, setSkill] = useState('')
    const [company, setCompany] = useState('')
    const [comapnyEmail, setCompanyEmail] = useState('')

    const onChangeBio = (e) => {
        setBio(e.target.value)
    }
    const onChangeSkill = (e) => {
        setSkill(e.target.value)
    }
    const onChangeCompany = (e) => {
        setCompany(e.target.value)
    }
    const onChangeCompanyEmail = (e) => {
        setCompanyEmail(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("bio", bio)
        formData.append("skill_set", skill)
        formData.append("company", company)
        formData.append("company_email", comapnyEmail)
        axiosInstance.patch("/accounts/profile/", formData, {headers})
            .then(response => {
                history.go()
            })
            .catch(error => {

            })
    };

    const onExitClick = () => {
        axiosInstance.delete("/accounts/withdrawal/", {headers})
            .then(response => {
                dispatch(deleteToken(jwtToken))
                history.push('/')
            })
            .catch(error => {

            })
    }

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const onChangeOldPassword = (e) => {
        setOldPassword(e.target.value)
    }
    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }


    const onChangePassWordSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append("old_password", oldPassword)
        console.log(oldPassword)
        formData.append("new_password", newPassword)
        console.log(newPassword)
        axiosInstance.put("/accounts/change/", formData, {headers})
            .then(response => {
                history.go('/')
            })
            .catch(error => {

            })
    }

    return (
        <>
            <Stack sx={{height: '100%', width: '100%'}}
                   direction='column'
                   alignItems='left'
            >
                <TextField
                    helperText="자기소개"
                    id="outlined-helperText"
                    defaultValue={profileInfo.bio}
                    size="small"
                    multiline
                    fullWidth={true}
                    rows={6}
                    name="bio"
                    onChange={onChangeBio}
                    elevation={0}
                />

                <TextField
                    id="outlined-helperText"
                    helperText="Skill"
                    defaultValue={profileInfo.skill_set}
                    size="small"
                    multiline
                    fullWidth={true}
                    rows={1}
                    name="skill"
                    onChange={onChangeSkill}
                    elevation={0}
                />

                <TextField
                    id="outlined-helperText"
                    helperText="회사"
                    defaultValue={profileInfo.company}
                    size="small"
                    multiline
                    fullWidth={true}
                    rows={1}
                    name="company"
                    onChange={onChangeCompany}
                    elevation={0}
                />

                <TextField
                    id="outlined-helperText"
                    helperText="회사메일"
                    defaultValue={profileInfo.company_email}
                    size="small"
                    multiline
                    fullWidth={true}
                    rows={1}
                    name="comapnyEmail"
                    onChange={onChangeCompanyEmail}
                    elevation={0}
                />

                <Stack sx={{width: '100%'}} direction='row' justifyContent='space-evenly'>
                    <Button
                        sx={{width: "100%", height: 30}}
                        variant="contained"
                        color="success"
                        component="span"
                        type="submit"
                        value="submit"
                        onClick={onSubmit}
                    >
                        회원정보 변경
                    </Button>
                    <Button
                        sx={{width: "100%", height: 30}}
                        variant="contained"
                        color="warning"
                        component="span"
                        type="submit"
                        value="submit"
                        onClick={handleOpen}
                    >
                        비밀번호 변경
                    </Button>

                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 400 }}>
                            <span>패스워드 변경</span>
                            <TextField
                                id="outlined-password-input"
                                label="Old password"
                                type="password"
                                fullWidth={true}
                                name="old_password"
                                onChange={onChangeOldPassword}
                                autoComplete="current-password"
                            />
                            <TextField
                                id="outlined-password-input"
                                label="New password"
                                type="password"
                                fullWidth={true}
                                name="new_password"
                                onChange={onChangeNewPassword}
                                autoComplete="current-password"
                            />
                            <Button
                                sx={{width: "100%", height: 30}}
                                variant="contained"
                                color="warning"
                                component="span"
                                type="submit"
                                value="submit"
                                onClick={onChangePassWordSubmit}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Modal>

                    <Button
                        sx={{width: "100%", height: 30}}
                        variant="contained"
                        color="error"
                        component="span"
                        type="submit"
                        value="submit"
                        onClick={onExitClick}
                    >
                        회원탈퇴ㅜㅜ
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}