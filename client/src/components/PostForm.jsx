import { Alert, Button, Input, Option, Select } from '@material-tailwind/react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomBtn from '../components/CustomBtn';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import _ from 'lodash';

export default function PostForm({ post, isUpdate }) {
    const [publishError, setPublishError] = useState(null)
    const [file, setfile] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState(post || {})
    const navigate = useNavigate()
    // console.log(formData)
    // image upload
    const handleUploadImage = () => {
        try {
            if (!file) {
                setImageUploadError("Please select an image");
                return;
            }
            const storage = getStorage(app)
            const fileName = new Date().getTime() + "-" + file.name;
            // console.log(fileName)
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log( progress );
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload error');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            )
        } catch (error) {
            setImageUploadError('Image upload error');
            setImageUploadProgress(null);
            // console.log(error)
        }

    }

    // handle submit 
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(formData)
        try {
            const response = await axios.post('/api/post/create', formData)
            // console.log(response)
            if (response?.statusText === 'Created') {
                setPublishError(null)
                navigate(`/post/${response?.data?.data?.slug}`)
            } else {
                setPublishError(response?.data?.message)
            }
        } catch (error) {
            setPublishError(error?.message)
        }
    }
    const handleUpdate = async (e) => {
        e.preventDefault()
        const areEqual = _.isEqual(formData, post);
        try {
            if (areEqual) {
                setPublishError("form data is not changed!")
            } else {
                setPublishError(null)
                const res = await axios.put(`/api/post/updatepost/${post._id}/${post.userId}`, formData)
                // console.log(res?.data?.data?.slug)
                if (res?.statusText === 'OK') {
                    setPublishError(null)
                    navigate(`/post/${res?.data?.data?.slug}`)
                } else {
                    setPublishError(res?.data?.message)
                }
            }
        } catch (error) {
            console.log(error)
            setPublishError(error?.message)
        }

    }
    return (
        <div className=' max-w-3xl mx-auto my-20'>
            <h1 className='text-center text-3xl my-7 font-semibold'>{isUpdate ? "Update the" : "Create a"} post</h1>
            <form className='space-y-7' onSubmit={isUpdate ? handleUpdate : handleSubmit}>
                <div className='w-full flex flex-col gap-5 sm:flex-row justify-between'>
                    <div className='w-1/2'>
                        <Input size="lg" color="teal" type="text" label="Title" className='' labelProps={{
                            className: "",
                        }} onChange={(e) => setFormData({ ...formData, title: e.target.value })} defaultValue={formData?.title} />

                    </div>
                    {/* <Select size="lg" label="Select Version" color="teal" 
                    onChange={(e) => console.log(e.target.value)}
                    >
                        <Option>Option 1</Option>
                        <Option>Option 3</Option>
                        <Option>Option 4</Option>
                        <Option>Option 5</Option>
                    </Select> */}
                    <select name="" id="" className='border-[1px] border-gray-400 p-2 outline-none rounded-lg w-1/2 dark:bg-transparent ' onChange={(e) => setFormData({ ...formData, category: e.target.value })} defaultValue={formData?.category}>
                        <option value="uncategorized">Select a Category</option>
                        <option value="reactjs">React Js</option>
                        <option value="vuejs">Vue Js</option>
                        <option value="Nextjs">Next Js</option>
                    </select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted py-2'>
                    <input type="file" className='border-[1px] p-2 focus:border-teal-500 rounded-lg ' onChange={(e) => setfile(e.target.files[0])} />
                    <Button color="teal" variant="outlined" className='w-max' onClick={handleUploadImage}
                    >
                        {imageUploadProgress ? <div className='w-10 h-10'>
                            <CircularProgressbar
                                value={imageUploadProgress}
                                text={`${imageUploadProgress || 0}%`}
                            />
                        </div> : "Upload Image"}
                    </Button>
                </div>
                {imageUploadError && <Alert color="red">{imageUploadError}</Alert>}
                {formData.image && (
                    <img src={formData.image} alt="" className='w-full h-72 object-cover' />
                )}
                <ReactQuill theme="snow" className='h-[200px] pb-12' required
                    onChange={(value) => setFormData({ ...formData, content: value })} defaultValue={formData?.content}
                />
                <div>
                    <CustomBtn title={isUpdate ? "Update Post" : "Publish Post"} loading={false} />
                </div>
            </form >
            {publishError && <Alert color="red" className='mt-5'>{publishError}</Alert>}

        </div >
    )
}

