import { Box, Typography } from '@mui/material'
import classNames from 'classnames/bind'

import styles from './Banner.module.scss'

const cx = classNames.bind(styles)

const Banner = () => {
    return (
        <Box className={cx('banner')}>
            <Typography className={cx('heading')}>QUOC ANH</Typography>
            <Typography className={cx('sub-heading')}>Create your space</Typography>
        </Box>
    )
}

export default Banner
