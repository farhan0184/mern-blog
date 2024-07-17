import { Alert, Button, Input, Option, Select } from '@material-tailwind/react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomBtn from '../components/CustomBtn';
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function CreatePost() {
    const [file, setfile] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [formData, setFormData] = useState({})
    const handleUploadImage = () =>{
        try {
            if(!file){
                setImageUploadError("Please select an image");
                return;
            }
            const storage = getStorage(app)
            const fileName = new Date().getTime() + "-"+ file.name;
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
    console.log(imageUploadProgress)
    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>
            <form className='space-y-7'>
                <div className='flex flex-col gap-5 sm:flex-row justify-between'>
                    <Input size="lg" color="teal" type="text" label="Title" className='flex-1' labelProps={{
                        className: "",
                    }} />
                    <Select size="lg" label="Select Version" color="teal">
                        <Option>Material Tailwind HTML</Option>
                        <Option>Material Tailwind React</Option>
                        <Option>Material Tailwind Vue</Option>
                        <Option>Material Tailwind Angular</Option>
                        <Option>Material Tailwind Svelte</Option>
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted py-2'>
                    <input type="file" className='border-[1px] p-2 focus:border-teal-500 rounded-lg ' onChange={(e) => setfile(e.target.files[0])}/>
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
                {formData.image &&(
                    <img src={formData.image} alt="" className='w-full h-72 object-cover' />
                )}
                <ReactQuill theme="snow" className='h-[200px] pb-12' required />
                <div>
                    <CustomBtn title="Publish Post" loading={false} />
                </div>
            </form >


        </div >
    )
}
