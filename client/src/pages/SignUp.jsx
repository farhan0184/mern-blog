import { Alert, Button, Card, Typography } from "@material-tailwind/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from "../utils/schema";
import CustomInput from "../components/CustomInput";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoafingBtnSvg from "../components/LoafingBtnSvg";
import GoogleAuth from "../components/GoogleAuth";



export default function SignUp() {
  const [formError, setFormError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { handleSubmit, register, reset, formState: { errors } } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: ''
    },
    resolver: zodResolver(signupSchema)
  })

  const onSubmit = async (value) => {

    // console.log(value)
    try {
      setLoading(true)
      const res = await axios.post('/api/auth/signup', value)
      // console.log(res);
      setSuccess(res?.data?.message)
      reset()
      setLoading(false)
      console.log(res);
      if(res.status === 200){
        navigate('/sign-in')
      }
    } catch (error) {
      setFormError(error?.response?.data?.message)
      setLoading(false)
    }

  }
  return (
    <section className="min-h-screen my-5  flex md:flex-row flex-col   gap-5" >
      {/* left side */}
      <div className="flex-1  md:flex hidden justify-center items-center">
        <div className="w-[50%] ">
          <Typography
            variant="h6"
            className="mr-4 cursor-pointer self-center whitespace-nowrap text-4xl font-bold dark:text-white py-1.5 lg:ml-2"
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Farhan&apos;s</span>Blog
          </Typography>
          <p className="text-sm mt-2 pl-3 text-gray-500">This is a Blog project. You can sign up with your email and password.</p>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1 flex items-center md:justify-start justify-center">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-4">
              <CustomInput type={'text'} register={register} name={'username'} placeholder={'username'} error={errors.username} label={'Your UserName'} />
              <CustomInput type={'email'} register={register} name={'email'} placeholder={'compan@gmail.com'} error={errors.email} label={'Your Email'} />
              <CustomInput type={'password'} register={register} name={'password'} placeholder={'********'} error={errors.password} label={'Password'} />


            </div>

            <Button type="submit" className="mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" fullWidth>
              {loading ? <LoafingBtnSvg/> : 'Sign Up'}
            </Button>
            <GoogleAuth />
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="/sign-in" className="font-medium text-gray-900">
                Sign In
              </a>
            </Typography>
            <div className="mt-3">
              {formError && <Alert color="red" >{formError}</Alert>}
              {success && <Alert color="green">{success}</Alert>}
            </div>
          </form>
        </Card>
      </div>
    </section>
  )
}
