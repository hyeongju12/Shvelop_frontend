import React, {useEffect, useState} from 'react'
import './Signup.scss'
import {useHistory} from "react-router-dom";
import LogoBox from "../../components/Logo/LogoBox";
import SearchBox from "../../components/Box/SearchBox";
import AccountMenu from "../../components/Menu/AccountMenu";
import Typography from "@mui/material/Typography";
import {InputAdornment, Link, Paper, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {AccountCircle} from "@mui/icons-material";
import PasswordIcon from '@mui/icons-material/Password';
import EmailIcon from '@mui/icons-material/Email';
import {axiosInstance} from "api";

export default function Signup() {
    const [inputs, setInputs] = useState({username: '', password: '', email: ''})
    const [errors, setErrors] = useState({})
    const [formDisabled, setFormDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault()

        setErrors({});

        axiosInstance.post("/accounts/signup/", {inputs})
            .then(response => {
                    history.push('/accounts/login/')
                    console.log(response['status'])
                },
            )
            .catch(error => {
                if (error.response) {
                    setErrors({
                        username: (error.response.data.username || []).join(""),
                        password: (error.response.data.password || []).join(""),
                        email: (error.response.data.email || []).join("")
                    });
                    console.log(error.response)
                }
                history.go()
            })
            .finally(() => {
                setLoading(true)
            });
    };

    useEffect(() => {
        const isEnable=  Object.values(inputs).every(s => s.length > 0);
        setFormDisabled(!isEnable)
    }, [inputs])

    const onChange = (e) => {
        const {name, value} = e.target
        setInputs(prev => ({
            ...inputs,
            [name]: value,
        }))
    }

    return (
        <div className="app">
            {/* Start Header */}
            <div className="header">
                <div className="logo">
                    <LogoBox/>
                </div>
                <div className="search-bar">
                    <SearchBox/>
                </div>
                <div className="top-nav-bar">
                    <AccountMenu />
                </div>
            </div>
            {/* End Header */}


            <div className="signup">
                <Paper
                    sx={{
                        height: '100%',
                        width: '56%',
                        marginLeft: 28,
                        alignItems: 'center'
                    }}
                    elevation={9}
                >
                    <form onSubmit={onSubmit}>
                        <Stack alignItems={'center'} margin={10} spacing={5} >
                            <TextField
                                id="outlined-username-input"
                                label="Username"
                                type="username"
                                name="username"
                                onChange={onChange}
                                sx={{ m: 1, width: '50ch' }}
                                InputProps={{
                                    startAdornment : (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {errors.username}
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                name="password"
                                onChange={onChange}
                                sx={{ m: 1, width: '50ch' }}
                                InputProps={{
                                    startAdornment : (
                                        <InputAdornment position="start">
                                            <PasswordIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {errors.password}
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                type="email"
                                // autoComplete="current-email"
                                name="email"
                                onChange={onChange}
                                sx={{ m: 1, width: '50ch' }}
                                InputProps={{
                                    startAdornment : (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            {errors.email}
                            <Button
                                type="submit"
                                value="회원가입"
                                disabled={loading || formDisabled}
                                variant="contained"
                                size="large"
                            >
                                Sign Up
                            </Button>
                        </Stack>
                    </form>
                </Paper>
            </div>

            <div className="footer">
                <Typography component="p" align="center">
                    안녕하세요 유형주입니다. 이 사이트는 Material UI으로 구성되어있습니다.
                    열심히 개발 중입니다. 실 사용은 어려울 수 있습니다.
                </Typography>
                <Typography component="p" align="center">
                    <Link>Contact</Link>
                    &copy 유형주
                </Typography>
            </div>
        </div>
    );
}

