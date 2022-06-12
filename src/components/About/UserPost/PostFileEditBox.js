import * as React from "react";
import {useState} from "react";
import Button from "@mui/material/Button";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {axiosInstance} from "api";
import {useHistory} from "react-router-dom";
import {useAppContext} from "store";

export default function PostFileEditBox({post}) {
    const {store: {jwtToken}} = useAppContext()
    const headers = {Authorization: `JWT ${jwtToken}`}
    const history = useHistory()
    const [attachedFile, setAttachedFile] = useState('');


    const handleAttachChange = async (e) => {
        await setAttachedFile(e.target.files[0]);
    };
    console.log(attachedFile)
    /////////////////////////////////////////////////////////////////////////////
    const onUpdateSubmit = (e) => {
        e.preventDefault()
        let editFormData = new FormData();
        editFormData.append("attached_file", attachedFile)
        console.log('formData :', editFormData)
        axiosInstance.patch(`/api/set/${post.id}/edit/`, editFormData, {headers})
            .then(response => {
                history.go()
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })
    };
    /////////////////////////////////////////////////////////////////////////////
    return (
        <>
            <AttachFileIcon />
            <input type="file" multiple onChange={handleAttachChange}/>
            <Button variant="contained" component="span" name="coverImage" sx={{marginLeft: 1}} style={{width: '100%'}} onClick={onUpdateSubmit}>
                <span>File Submit</span>
            </Button>
        </>
    )
}
