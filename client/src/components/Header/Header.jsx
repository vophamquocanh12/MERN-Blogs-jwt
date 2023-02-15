import { AppBar, Toolbar, Typography } from '@mui/material'
import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

const cx = classNames.bind(styles)

const Header = () => {
    return (
        <AppBar className={cx('app-bar')}>
            <Toolbar className={cx('container')}>
                <Typography><Link className={cx('link')} to="/">HOME</Link></Typography>
                <Typography>ABOUT</Typography>
                <Typography>CONTACT</Typography>
                <Typography>LOGOUT</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header
