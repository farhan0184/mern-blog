import { Alert, Button, Card, Typography } from "@material-tailwind/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema } from "../utils/schema";
import CustomInput from "../components/CustomInput";
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";



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
      setSuccess(res.data.message)
      reset()
      setLoading(false)
      console.log(res);
      if(res.statusText === 'OK'){
        navigate('/sign-in')
      }
    } catch (error) {
      setFormError(error.response.data.message)
      setLoading(false)
    }

  }
  return (
    <section className="min-h-screen my-5  flex flex-col md:flex-row  gap-5" >
      {/* left side */}
      <div className="flex-1  flex justify-end items-center">
        <div className="w-[50%] ">
          <Typography
            variant="h6"
            className="mr-4 cursor-pointer self-center whitespace-nowrap text-4xl font-bold dark:text-white py-1.5 lg:ml-2"
          >
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Farhan&apos;s</span>Blog
          </Typography>
          <p className="text-sm mt-2 pl-3 text-gray-500">This is a demo project. You can sign up with your email and password or with Google.</p>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1 flex items-center">
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
              {loading ? <div className="flex gap-2 justify-center h-min w-full  place-items-center overflow-x-scroll rounded-lg  lg:overflow-visible">
                <svg className="text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24">
                  <path
                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                    stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path
                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                    stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
                  </path>
                </svg>
                Loading...
              </div> : 'sign up'}
            </Button>
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
