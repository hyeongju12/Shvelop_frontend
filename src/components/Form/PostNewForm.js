import {Checkbox, Divider, FormControlLabel, Input, InputAdornment, Paper, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";
import {useAppContext} from "store";
import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import TitleIcon from '@mui/icons-material/Title';
import CategoryIcon from '@mui/icons-material/Category';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Typography from "@mui/material/Typography";
import {axiosInstance} from "api";

export default function PostNewForm() {
    const history = useHistory();
    const {
        store: { jwtToken }
    } = useAppContext();
    const [title, setTitle] = useState()
    const [category, setCategory] = useState()
    const [content, setContent] = useState()
    const [attachedfile, setAttachedfile] = useState()
    const [coverimg, setCoverimg] = useState()
    const [checked, setChecked] = useState(true);

    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const onChangeCategory = (e) => {
        setCategory(e.target.value)
    }

    const onChangeContent = (e) => {
        setContent(e.target.value)
    }

    const handleFileCapture = async (e) => {
        await setAttachedfile(e.target.files[0])
    };

    const handleImageCapture =async (e) => {
        await setCoverimg(e.target.files[0])
    };

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };




const onSubmit = (e) => {
    e.preventDefault()

    let formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", content);
    formData.append("attached_file", attachedfile);
    formData.append("cover_img", coverimg);
    formData.append("is_public", checked)


    const headers = {
        Authorization: `JWT ${jwtToken}`,
    };

    axiosInstance.post("/api/posts/", formData, {headers})
        .then(response => {
            history.push('/')
            console.log(response['status'])
        })
        .catch(error => {
            console.log(error.response)
        })
};


    return (
        <div className="signup">
            <Paper
                sx={{
                    height: 900,
                    width: '92.5%',
                    marginLeft: 5
                }}
                elevation={9}
            >
                <form onSubmit={onSubmit}>
                    <Typography
                        variant="h5"
                        marginLeft={10}
                        marginTop={5}
                        marginBottom={-5}
                        gutterBottom
                        component="div"
                        fontFamily="Arial">
                        New Post
                    </Typography>
                    <Stack margin={10} marginLeft={15} marginBottom={25} spacing={3} >
                        <TextField
                            id="outlined-username-input"
                            label="Title"
                            type="title"
                            name="title"
                            onChange={onChangeTitle}
                            sx={{ width: '95%' }}
                            InputProps={{
                                startAdornment : (
                                    <InputAdornment position="start">
                                        <TitleIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            id="outlined-category-input"
                            label="Category"
                            type="category"
                            name="category"
                            onChange={onChangeCategory}
                            sx={{ width: '95%' }}
                            InputProps={{
                                startAdornment : (
                                    <InputAdornment position="start">
                                        <CategoryIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            id="outlined-content-input"
                            label="Content"
                            type="content"
                            name="content"
                            onChange={onChangeContent}
                            placeholder="Content..."
                            rows={10}
                            multiline
                            sx={{ width: '95%', height: 80}}
                            InputProps={{
                                startAdornment : (
                                    <InputAdornment position="start">
                                        <TextSnippetIcon/>
                                        <Divider orientation="vertical"/>
                                    </InputAdornment>
                                )
                            }}
                        />

                    </Stack>
                    <Stack sx={{marginLeft: 15}} spacing={2} >
                        <Typography
                            variant="button"
                            marginBottom={-1}
                            component="div"
                            fontFamily="Arial"
                        >
                            [붙임 파일]
                        </Typography>
                        <label htmlFor="contained-button-file" >
                            <Input
                                accept="image/*"
                                id="contained-button-file"
                                multiple type="file"
                                onChange={handleFileCapture}
                                name="attached_file"
                            />
                        </label>
                        <Typography
                            variant="button"
                            marginBottom={-2}
                            component="div"
                            fontFamily="Arial">
                            [커버 이미지]
                        </Typography>
                        <label htmlFor="icon-button-file" title="커버 이미지 업로드">
                            <Input
                                accept="image/png, image/jpeg"
                                id="icon-button-file"
                                type="file"
                                onChange={handleImageCapture}
                                name="cover_img"
                            />
                        </label>
                        <FormControlLabel
                            label="is_public"
                            control={<Checkbox
                                checked={checked}
                                inputProps={{ 'aria-label': 'controlled' }}
                                label="is_public"
                            />}
                            onChange={handleChange}
                        />
                    </Stack>

                    <Stack direction="row" margin={5} spacing={3} >
                        <Button
                            type="submit"
                            value="submit"
                            variant="contained"
                            sx={{width: "90%", align: 'center'}}
                        >
                            Submit
                        </Button>
                        <Button
                            type="submit"
                            value="new-post"
                            variant="contained"
                            color="error"
                            sx={{width: "90%", align: 'center'}}
                            component={Link} to={"/"}
                        >
                            Cancle
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    )
}