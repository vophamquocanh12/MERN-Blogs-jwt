import { useState } from 'react'
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
import classNames from 'classnames/bind'
import { logo } from '~/assets/images'

import styles from './Login.module.scss'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const cx = classNames.bind(styles)

const signupInitialValues = {
    name: '',
    username: '',
    password: '',
    confirmPassword: ''
}

const Login = () => {
    const [account, toggleAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialValues)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const toggleAction = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup')
    }

    const onInputChange = (e) => {
        setSignup({...signup, [e.target.name] : e.target.value})
    }

    // show hide password
    const handleClickShowPassword = () => {
        setShowPassword(true)
    }

    const handleMouseDownPassword = () => {
        setShowPassword(false)
    }

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(true)
    }

    const handleMouseDownConfirmPassword = () => {
        setShowConfirmPassword(false)
    }

    return (
        <Box className={cx('box-wrapper')}>
            <Box>
                <img className={cx('image')} src={logo} alt="logo" />
                {account === 'login' ? (
                    <Box className={cx('box-content')}>
                        <TextField className={cx('text-field')} variant="standard" label="Enter username" />
                        <FormControl variant="standard" className={cx('text-field')}>
                            <InputLabel htmlFor="standard-adornment-password">Enter password</InputLabel>
                            <Input
                                id="standard-adornment-password"
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
                        <Button className={cx('btn', 'btn-login')} variant="contained">
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
                        <TextField className={cx('text-field')} variant="standard" label="Enter name" name="name" onChange={onInputChange} />
                        <TextField className={cx('text-field')}  name="username" variant="standard" label="Enter username" onChange={onInputChange} />
                        <FormControl variant="standard" className={cx('text-field')}>
                            <InputLabel htmlFor="standard-adornment-password">Enter password</InputLabel>
                            <Input
                                id="standard-adornment-password"
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
                                name="password"
                                onChange={onInputChange}
                            />
                        </FormControl>
                        <FormControl variant="standard" className={cx('text-field')}>
                            <InputLabel htmlFor="standard-adornment-password">Enter  confirm password</InputLabel>
                            <Input
                                id="standard-adornment-password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownConfirmPassword}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                name="confirmPassword"
                                onChange={onInputChange}
                            />
                        </FormControl>

                        <Button className={cx('btn', 'btn-signup')}>Sign up</Button>
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
