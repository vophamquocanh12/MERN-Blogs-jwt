import { useEffect, useState, useContext } from 'react'
import classNames from 'classnames/bind'
import { Button, FormControl, InputBase, TextareaAutosize, Box } from '@mui/material'
import { AddCircle as Add } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'

import styles from './CreatePost.module.scss'
import { bannerCreate } from '~/assets/images'
import { DataContext } from '~/context/DataProvider'

const cx = classNames.bind(styles)

const initialPost = {
    title: '',
    description: '',
    picture: '',
    categories: '',
    createdDate: new Date(),
}

const CreatePost = () => {

    const [post, setPost] = useState(initialPost)
    const [file, setFile] = useState('')

    const {account} = useContext(DataContext)

    const location = useLocation()


    
    useEffect(() => {
        const getImage = () => {
            if(file){
                const data = new FormData()
                data.append("name", file.name)
                data.append("file", file)

                // API CALL
                post.picture = '' 
            }
        }
        getImage()
        post.categories = location.search?.split('-')[1] || 'All'
        post.username = account.username
    }, [file]);

    const handleChange = (e) => {
        setPost({...post, [e.target.name]: e.target.value})
    }

    return (
        <Box className={cx('container')}>
            <img className={cx('image-banner')} src={bannerCreate} alt="banner create" />

            <FormControl className={cx('form-control')}>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                 <input type="file" id="fileInput" style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
                <InputBase className={cx('input-text-field')} onChange={handleChange} name="title" placeholder="Title" />
                <Button variant="contained">Publish</Button>
            </FormControl>
            <TextareaAutosize className={cx('textarea')} minRows={5} placeholder="Tell your story ...." onChange={handleChange} name="description" />
        </Box>
    )
}

export default CreatePost
