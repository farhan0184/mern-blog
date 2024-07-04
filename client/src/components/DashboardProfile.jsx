import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CustomInput from './CustomInput'
import { useForm } from 'react-hook-form'
import { profileSchema} from '../utils/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomBtn from './CustomBtn'

export default function DashboardProfile() {
    const [loading, setLoading] = useState(false)
    const {user} = useSelector((state)=>state.user)
    const { handleSubmit, register, reset, formState: { errors } } = useForm({
        defaultValues: {
          profileImg: user.profilePicture, 
          username: user.username,
          email: user.email,
          password: ''
        },
        resolver: zodResolver(profileSchema),
        
      })
    
    // console.log(user)
    const onSubmit = async (value) => {
        console.log(value)
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mx-auto'>
                <img 
                    src={user?.profilePicture} 
                    alt="userImg"
                    className='rounded-full w-full h-full object-cover border-8 border-gray-500' 
                />
            </div>
            <CustomInput type={'text'} register={register} name={'username'} placeholder={'text0001'} error={errors.username} label={'Username'} />
            <CustomInput type={'email'} register={register} name={'email'} placeholder={'compan@gmail.com'} error={errors.email} label={'Your Email'} />
            <CustomInput type={'password'} register={register} name={'password'} placeholder={'password'} error={errors.password} label={'Password'} />
            <CustomBtn title={'Sign In'} loading={loading}/>
            
        </form>

        <div className='text-red-500 flex justify-between pt-5'>
            <span className='cursor-pointer'>Delete Account</span>
            <span className='cursor-pointer'>Sign Out</span>
        </div>
    </div>
  )
}
