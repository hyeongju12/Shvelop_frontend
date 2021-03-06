import React from 'react'
import {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import LogoBox from "../../components/Logo/LogoBox";
import SearchBox from "../../components/Box/SearchBox";
import AccountMenu from "../../components/Menu/AccountMenu";
import {InputAdornment, Link, Paper, Stack, TextField} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import PasswordIcon from "@mui/icons-material/Password";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {setToken, useAppContext} from "store";
import {axiosInstance} from "api";


export default function Login() {
    const {dispatch} = useAppContext()
    const location = useLocation();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const [formDisabled, setFormDisabled] = useState(false)

    const {from: loginRedirectUrl} = location.state || {
        from: {pathname : "/"}
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log()
        setErrors({});
        axiosInstance.post("/accounts/token/", inputs)
            .then(response => {
                const {
                    data : {
                        token: jwtToken,
                    }
                } = response
                dispatch(setToken(jwtToken))
                history.push(loginRedirectUrl)
            })
            .catch(error => {
                if (error.response) {
                    setErrors({
                        username: (error.response.data.username || []).join(""),
                        password: (error.response.data.password || []).join(""),
                    });
                    console.log('데이터 수신불가')
                    console.log(error.response)
                    history.go()
                }
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
                        height: '600px',
                        width: '56%',
                        marginLeft: 28,
                        alignItems: 'center'
                    }}
                    elevation={9}
                >
                    <form onSubmit={onSubmit}>
                        <Stack alignItems={'center'} margin={10} spacing={3} >
                            <TextField
                                id="outlined-username-input"
                                label="Username"
                                type="username"
                                autoComplete="current-username"
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
                                autoComplete="current-password"
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
                            <Button
                                type="submit"
                                value="로그인"
                                disabled={loading || formDisabled}
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>
                            <Button
                                href="/accounts/signup/"
                                value="회원가입"
                                variant="contained"
                                fullWidth
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
    )
}