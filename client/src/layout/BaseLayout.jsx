import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { userSignoutSuccess } from '../redux/user/userSlice'





export default function BaseLayout() {
  const [isLogin, setIsLogin] = useState(false)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const loginOrNot = async () => {
      const res = await axios.get('/loginOrNot')

      if (res.statusText === 'OK') {
        setIsLogin(true)
      }else{
        setIsLogin(false)
        dispatch(userSignoutSuccess())
      }
    }
    loginOrNot()
  }, [])
  // console.log(isLogin)
  return (
    <div className='pt-20'>
      <Outlet />
    </div>
  )
}
