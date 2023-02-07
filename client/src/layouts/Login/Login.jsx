import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    TextField,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Input,
    InputAdornment,
    IconButton,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import classNames from 'classnames/bind'

import styles from './Login.module.scss'
import { logo } from '~/assets/images'
import { API } from '~/service/api'
import { DataContext } from '~/context/DataProvider'

const cx = classNames.bind(styles)

const loginInitialValues = {
    username: '',
    password: '',
}

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
}

const Login = () => {
    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialValues)
    const [login, setLogin] = useState(loginInitialValues)
    const [showPassword, setShowPassword] = useState(false)
    const [error, showError] = useState('')

    const navigate = useNavigate()
    const { setAccount } = useContext(DataContext)


    const onSignupChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    // show hide password
    const handleClickShowPassword = () => {
        setShowPassword(true)
    }

    const handleMouseDownPassword = () => {
        setShowPassword(false)
    }

    // action signup
    const signupUser = async () => {
        const response = await API.userSignup(signup)
        if (response.isSuccess) {
            showError('')
            setSignup(signupInitialValues)
            toggleAccount('login')
        } else {
            showError('Something went wrong! Please try again later')
        }
    }
    // action login
    const loginUser = async () => {
        const response = await API.userLogin(login)
        if (response.isSuccess) {
            showError('')
            
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);

            setAccount({ name: response.data.name, username: response.data.username })
            setLogin(loginInitialValues)
            navigate('/')
        } else {
            showError('Something went wrong! Please try again later')
        }
    }

    const toggleAction = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup')
    }

    return (
        <Box className={cx('box-wrapper')}>
            <Box>
                <img className={cx('image')} src={logo} alt="logo" />
                {account === 'login' ? (
                    <Box className={cx('box-content')}>
                        <TextField
                            className={cx('text-field')}
                            variant="standard"
                            value={login.username}
                            name="username"
                            onChange={onValueChange}
                            label="Enter username"
                        />
                        <FormControl variant="standard" className={cx('text-field')}>
                            <InputLabel htmlFor="standard-adornment-password">Enter password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                name="password"
                                value={login.password}
                                onChange={onValueChange}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                
                            />
                        </FormControl>

                        {error && <Typography className={cx('error')}>{error}</Typography>}
                        <Button className={cx('btn', 'btn-login')} variant="contained" onClick={loginUser}>
                            Login
                        </Button>
                        <Typography className={cx('text')} style={{ textAlign: 'center' }}>
                            OR
                        </Typography>
                        <Button className={cx('btn', 'btn-signup')} onClick={toggleAction}>
                            Create an account
                        </Button>
                    </Box>
                ) : (
                    <Box className={cx('box-content')}>
                        <TextField
                            className={cx('text-field')}
                            variant="standard"
                            name="name"
                            label="Enter name"
                            onChange={onSignupChange}
                        />
                        <TextField
                            className={cx('text-field')}
                            variant="standard"
                            label="Enter username"
                            onChange={onSignupChange}
                            name="username"
                        />
                        <FormControl variant="standard" className={cx('text-field')}>
                            <InputLabel htmlFor="standard-adornment-password">Enter password</InputLabel>
                            <Input
                                id="standard-adornment-password" name="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                
                                onChange={onSignupChange}
                            />
                        </FormControl>
                        {error && <Typography className={cx('error')}>{error}</Typography>}
                        <Button className={cx('btn', 'btn-signup')} onClick={signupUser}>
                            Sign up
                        </Button>
                        <Typography className={cx('text')} style={{ textAlign: 'center' }}>
                            OR
                        </Typography>
                        <Button className={cx('btn', 'btn-login')} variant="contained" onClick={toggleAction}>
                            Already have an account
                        </Button>
                    </Box>
                )}
            </Box>
          
        </Box>
    )
}

export default Login
