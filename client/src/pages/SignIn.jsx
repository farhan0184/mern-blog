import { Alert, Button, Card, Typography } from "@material-tailwind/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signinSchema } from "../utils/schema";
import CustomInput from "../components/CustomInput";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoafingBtnSvg from "../components/LoafingBtnSvg";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import GoogleAuth from "../components/GoogleAuth";
import CustomBtn from "../components/CustomBtn";



export default function SignIn() {
  const dispatch = useDispatch()
  const {loading, error} = useSelector(state => state.user)
  const navigate = useNavigate()
  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: zodResolver(signinSchema)
  })

  const onSubmit = async (value) => {

    // console.log(value)
    try {
      dispatch(signInStart())
      const res = await axios.post('/api/auth/signin', value)
      // console.log(res);
      // setSuccess(res?.data?.message)
      // reset()
      
      // console.log(res);
      if (res?.statusText === 'OK') {
        dispatch(signInSuccess(res?.data?.data))
        navigate('/')
      }else{
        dispatch(signInFailure(res?.data?.message))
      }
    } catch (error) {
      dispatch(signInFailure(error?.response?.data?.message))
    }

  }
  return (
    <section className="min-h-screen my-5  flex flex-col md:flex-row  gap-5" >
      {/* left side */}
      <div className="flex-1  md:flex hidden justify-center items-center">
        <div className="w-[50%] ">
          <Typography
            variant="h6"
            className="mr-4 cursor-pointer self-center whitespace-nowrap text-4xl font-bold dark:text-white py-1.5 lg:ml-2"
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Farhan&apos;s</span>Blog
          </Typography>
          <p className="text-sm mt-2 pl-3 text-gray-500">This is a blog project. You can signin with your email and password.</p>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1 flex items-center md:justify-start justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to login.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-4">
              <CustomInput type={'email'} register={register} name={'email'} placeholder={'compan@gmail.com'} error={errors.email} label={'Your Email'} />
              <CustomInput type={'password'} register={register} name={'password'} placeholder={'********'} error={errors.password} label={'Password'} />


            </div>

            {/* <Button type="submit" className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" fullWidth>
              {loading ? <LoafingBtnSvg/> : 'Sign In'}
            </Button> */}
            <CustomBtn title={'Sign In'} loading={loading}/>
            <GoogleAuth />
            <Typography color="gray" className="mt-4 text-center font-normal">
              Have an account?{" "}
              <a href="/sign-up" className="font-medium text-gray-900">
                Sign Up
              </a>
            </Typography>
            <div className="mt-3">
              {error && <Alert color="red" >{error}</Alert>}
              {/* {success && <Alert color="green">{success}</Alert>} */}
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
