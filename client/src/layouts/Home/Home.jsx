import { Grid } from '@mui/material'
import classNames from 'classnames/bind'

import styles from './Home.module.scss'

//component
import { Banner, Categories } from '~/components'

const cx = classNames.bind(styles)

const Home = () => {
    return (
        <>
            <Banner />
            <Grid container>
                <Grid item lg={2} sm={2} xs={12}>
                    <Categories />
                </Grid>
                <Grid container item xs={12} smm={10} lg={10}>
                    Posts
                </Grid>
            </Grid>
        </>
    )
}

export default Home
