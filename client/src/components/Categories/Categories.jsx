import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import classNames from 'classnames/bind'

import styles from './Categories.module.scss'
import { categories } from '~/constants/data'
import { Link, useSearchParams } from 'react-router-dom'

const cx = classNames.bind(styles)

const Categories = () => {

    const [searchParams] = useSearchParams()
    const category = searchParams.get('category')

    return (
        <>
            <Link to={`/create?category=${category || ''}`} >
                <Button className={cx('btn-create')} variant="contained">
                    Create Blog
                </Button>
            </Link>

            <Table className={cx('table')}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link className={cx('link')} to="/">
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {categories.map((category) => (
                        <TableRow key={category.id}>
                            <TableCell>
                                <Link className={cx('link')} to={`/?category=${category.type}`}>
                                    {category.type}
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

export default Categories
