import { Button, Input, Option, Select } from '@material-tailwind/react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomBtn from '../components/CustomBtn';

export default function CreatePost() {
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
                    <input type="file" className='border-[1px] p-2 focus:border-teal-500 rounded-lg ' />
                    <Button color="teal" variant="outlined" className='w-max'>Upload Image</Button>
                </div>
                <ReactQuill theme="snow" className='h-[200px] pb-12' required />
                <div>
                    <CustomBtn title="Publish Post" loading={false} />
                </div>
            </form >


        </div >
    )
}
